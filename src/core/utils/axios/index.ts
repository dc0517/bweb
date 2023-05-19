import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '@/constants/constants/axios'
import type { AxiosTransform, CreateAxiosOptions } from './transform'
import axios from 'axios'
import { clone } from 'lodash-es'
import { VAxios } from './axios'
import { checkStatus } from './status'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/constants/enums/http-enum'
import { useGlobConfig } from '@/hooks/config'
import { useMessage } from '@/hooks/web/use-message'
import { isString } from '@/utils/is'
import { setObjToUrlParams, deepMerge } from '@/utils'
import { useUserStoreWithOut } from '@s/store/modules/user'
import { joinTimestamp, formatRequestDate } from './helper'
import { AxiosRetry } from './retry'

const globSetting = useGlobConfig()
const urlPrefix = globSetting.urlPrefix
const { createMessage } = useMessage()

/**
 * 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * 处理响应数据
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res
    if (!data) {
      throw new Error('请求出错，请稍候重试')
    }
    const { code, result, message } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }

    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = '登录超时,请重新登录!'
        const userStore = useUserStoreWithOut()
        userStore.logout()
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }
    createMessage.error(timeoutMsg)
    throw new Error(timeoutMsg || '请求出错，请稍候重试')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data))
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const userStore = useUserStoreWithOut()
    const token = userStore.getToken
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      ;(config as Recordable).headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token
    }
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    const { response, code, message, config } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '请求超时'
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络连接失败'
      }
      if (errMessage) {
        createMessage.error(errMessage)
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg)

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry()
    const { isOpenRetry } = config.requestOptions.retryRequest
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error)
    return Promise.reject(error)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // 认证方案
        authenticationScheme: '',
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  )
}
export const http = createAxios()

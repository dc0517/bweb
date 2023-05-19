// 错误消息提示类型
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined
// 成功消息提示类型
export type SuccessMessageMode = ErrorMessageMode

// 请求设置
export interface RequestOptions {
  // 请求参数是否拼接到url
  joinParamsToUrl?: boolean
  // 是否格式化请求参数时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回本机响应头：当需要获取响应标头时使用此属性
  isReturnNativeResponse?: boolean
  // 是否将prefix添加到url
  joinPrefix?: boolean
  // 接口地址
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode
  // 成功消息提示类型
  successMessageMode?: SuccessMessageMode
  // 是否加入时间戳
  joinTime?: boolean
  // 忽略重复请求
  ignoreCancelToken?: boolean
  // 请求头是否使用token
  withToken?: boolean
  // 请求重试机制
  retryRequest?: RetryRequest
}

// 重试机制
export interface RetryRequest {
  // 是否开启重试
  isOpenRetry: boolean
  // 重试次数
  count: number
  // 等待时间
  waitTime: number
}

// 响应结果
export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

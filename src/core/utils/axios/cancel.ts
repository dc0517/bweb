import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { isFunction } from '@/utils/is'

// 用于存储每个请求的识别和取消
let pendingMap = new Map<string, Canceler>()
// 获取待处理url
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')
// 识别&取消 请求
export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel)
        }
      })
  }
  /**
   * 移除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }
  /**
   * 清空请求
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }
  /**
   * 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}

/**
 * 异常相关枚举
 */
export enum ExceptionEnum {
  // 页面无法访问
  PAGE_NOT_ACCESS = 403,
  // 页面未找到
  PAGE_NOT_FOUND = 404,
  // 页面异常
  ERROR = 500,
  // 网络错误
  NET_WORK_ERROR = 10000,
  // 暂无数据
  PAGE_NOT_DATA = 10100
}

/**
 * 异常类型枚举
 */
export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise'
}

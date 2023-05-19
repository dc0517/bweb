/**
 * 配置全局错误处理
 */
import type { ErrorLogInfo } from '@/constants/constants/stroe'
import { App } from 'vue'
import { useErrorLogStoreWithOut } from '@/store/error-log'
import { ErrorTypeEnum } from '@/constants/enums/exception-enum'
import projectSetting from '@/config/project-config'

/**
 * 处理错误堆栈信息
 * @param error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/gi, '')
    .replace(/\bat\b/gi, '@')
    .split('@')
    .slice(0, 9)
    .map((v) => v.replace(/^\s*|\s*$/g, ''))
    .join('~')
    .replace(/\?[^:]+/gi, '')
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }
  return stack
}

/**
 * 获取组件名称
 * @param vm
 */
function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root'
    }
  }
  const options = vm.$options as any
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous'
    }
  }
  const name = options.name || options._componentTag
  return {
    name: name,
    path: options.__file
  }
}

/**
 * Vue错误处理
 */
function vueErrorHandler(err: Error, vm: any, info: string) {
  const errorLogStore = useErrorLogStoreWithOut()
  const { name, path } = formatComponentName(vm)
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href
  })
}

/**
 * Script错误处理
 */
export function scriptErrorHandler(event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) {
  if (event === 'Script error.' && !source) {
    return false
  }
  const errorInfo: Partial<ErrorLogInfo> = {}
  colno = colno || (window.event && (window.event as any).errorCharacter) || 0
  errorInfo.message = event as string
  if (error?.stack) {
    errorInfo.stack = error.stack
  } else {
    errorInfo.stack = ''
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script'
  const errorLogStore = useErrorLogStoreWithOut()
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.SCRIPT,
    name: name,
    file: source as string,
    detail: 'lineno' + lineno,
    url: window.location.href,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>)
  })
  return true
}

/**
 * Promise错误处理
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.PROMISE,
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason
      })
    },
    true
  )
}

/**
 * 监控资源加载错误处理
 */
function registerResourceErrorHandler() {
  window.addEventListener(
    'error',
    function (e: Event) {
      const target = e.target ? e.target : (e.srcElement as any)
      const errorLogStore = useErrorLogStoreWithOut()
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.RESOURCE,
        name: 'Resource Error!',
        file: (e.target || ({} as any)).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: (e.target || ({} as any)).localName + ' is load error'
      })
    },
    true
  )
}

/**
 * 全局错误处理
 * @param app
 */
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = projectSetting
  if (!useErrorHandle) {
    return
  }
  // Vue 异常检测;
  app.config.errorHandler = vueErrorHandler
  // script 异常
  window.onerror = scriptErrorHandler
  // promise 异常
  registerPromiseErrorHandler()
  // 堆栈异常
  registerResourceErrorHandler()
}

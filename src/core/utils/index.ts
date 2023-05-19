import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Component } from 'vue'
import { unref } from 'vue'
import { isArray, isObject } from '@/utils/is'
import { cloneDeep, mergeWith } from 'lodash-es'

export const noop = () => {}

/**
 * 设置ui挂载节点
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * 将对象作为参数添加到URL中
 * @param baseUrl url
 * @param obj
 * @returns {string}
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 递归合并两个对象。
 @param target 目标对象，合并后结果存放于此
 @param source 要合并的源对象
 @returns 合并后的对象
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(target: T, source: U): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        return isArray(prevValue) ? prevValue.concat(nextValue) : undefined
      })
    }
  })
}

/**
 * 打开新窗口
 * @param url 新窗口url
 * @param opt
 */
export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []
  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')
  window.open(url, target, feature.join(','))
}

/**
 * 动态获取props
 * @param props
 * @returns
 */
export function getDynamicProps<T extends Record<string, unknown>, U>(props: T): Partial<U> {
  const ret: Recordable = {}
  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key])
  })
  return ret as Partial<U>
}

/**
 * 获取原始路由
 * @param route
 * @returns
 */
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path
        }))
      : undefined) as RouteRecordNormalized[]
  }
}

// 初始化组件
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void
    }
  }
}

export type WithInstall<T> = T & {
  install(app: App): void
} & EventShim

export type CustomComponent = Component & { displayName?: string }

export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  ;(component as Record<string, unknown>).install = (app: App) => {
    const compName = component.name || component.displayName
    if (!compName) return
    app.component(compName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as WithInstall<T>
}

import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

// 原始路由项
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}
// 菜单
export interface Menu {
  name: string
  icon?: string
  path: string
  paramPath?: string
  disabled?: boolean
  children?: Menu[]
  orderNo?: number
  meta?: Partial<RouteMeta>
  hideMenu?: boolean
}
// 菜单模块
export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw

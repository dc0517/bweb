import type { AppRouteRecordRaw, Menu } from '@/router/types'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import projectConfig from '@/config/project-config'
import { PermissionModeEnum } from '@/constants/enums/app-enum'
import { PageEnum } from '@/constants/enums/page-enum'
import { useMessage } from '@/hooks/web/use-message'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { asyncRoutes } from '@/router/routes'
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/route-helper'
import { transformRouteToMenu } from '@/router/helper/menu-helper'
import { filter } from '@/utils/tree-helper'
import { store } from '@s/store'
import { useUserStore } from '@s/store/modules/user'
import { useAppStoreWithOut } from './app'

interface PermissionState {
  // 权限代码列表
  permCodeList: string[] | number[]
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
  // 触发菜单更新
  lastBuildMenuTime: number
  // 后台菜单列表
  backMenuList: Menu[]
  // 菜单列表
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 权限代码列表
    permCodeList: [],
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
    // 菜单列表
    frontMenuList: []
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    }
  },
  actions: {
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    // 构建路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const appStore = useAppStoreWithOut()
      let routes: AppRouteRecordRaw[] = []
      const { permissionMode = projectConfig.permissionMode } = appStore.getProjectConfig
      // 移除被忽略路由
      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
        const { ignoreRoute } = meta || {}
        // arr.filter 返回 true 表示该元素通过测试
        return !ignoreRoute
      }
      /**
       * @description 根据设置的首页path
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      switch (permissionMode) {
        // 路由映射
        case PermissionModeEnum.FRONT:
          routes = asyncRoutes
          // 将路由转换成菜单
          const menuList = transformRouteToMenu(routes, true)
          // 移除掉 ignoreRoute: true 的路由 非一级路由
          routes = filter(routes, routeRemoveIgnoreFilter)
          // 移除掉 ignoreRoute: true 的路由 一级路由；
          routes = routes.filter(routeRemoveIgnoreFilter)
          // 对菜单进行排序
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })
          // 设置菜单列表
          this.setFrontMenuList(menuList)
          // 将多级路由转换为 2 级路由
          routes = flatMultiLevelRoutes(routes)
          break
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage()

          createMessage.loading({
            content: '菜单加载中...',
            duration: 1
          })

          let routeList: AppRouteRecordRaw[] = []
          try {
            const userStore = useUserStore()
            const menus = userStore.getUserInfo.menus
            if (menus?.length) {
              routeList = cloneDeep(menus) as AppRouteRecordRaw[]
            }
          } catch (error) {
            console.error(error)
          }
          // 动态引入组件
          routeList = transformObjToRoute(routeList)
          //  后台路由到菜单结构
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList)
          // 删除 meta.ignoreRoute 项
          routeList = filter(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)
          routeList = flatMultiLevelRoutes(routeList)
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
          break
      }
      patchHomeAffix(routes)
      return routes
    }
  }
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}

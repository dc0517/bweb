import type { MenuModule, Menu, AppRouteRecordRaw } from '@/router/types'
import { cloneDeep } from 'lodash-es'
import { RouteParams } from 'vue-router'
import { toRaw } from 'vue'
import { AppRouteModule } from '@/router/types'
import { findPath, treeMap } from '@/utils/tree-helper'
import { isUrl } from '@/utils/is'

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

// 路径处理
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // 请注意，以 / 开头的嵌套路径将被视为根路径
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 路径不以 / 开头，也不是 url，加入父路径
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}

// 解析菜单模块
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule
  const menuList = [menu]
  joinParentPath(menuList)
  return menuList[0]
}

// 将路由转换成菜单
export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []
  // 路由映射
  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  // 提取树指定结构
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node
      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  // 路径处理
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * 配置菜单与给定参数
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g

export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)
  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
    }
  })
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params))
}
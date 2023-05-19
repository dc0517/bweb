import type { Menu, MenuModule } from '@/router/types'
import { PermissionModeEnum } from '@/constants/enums/app-enum'
import { transformMenuModule, getAllParentPath } from '@/router/helper/menu-helper'
import { useAppStoreWithOut } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

const modules: Record<string, any> = import.meta.glob('./modules/**/*.ts', { import: 'default', eager: true })
const menuModules: MenuModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  menuModules.push(...modList)
})

// ===========================
// ==========Helper===========
// ===========================

// 获取权限模式
const getPermissionMode = () => {
  const appStore = useAppStoreWithOut()
  return appStore.getProjectConfig.permissionMode
}
// 权限模式：后端
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}
// 权限模式：前端
const isFrontMode = () => {
  return getPermissionMode() === PermissionModeEnum.FRONT
}
// 静态菜单
const staticMenus: Menu[] = []
;(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0)
  })
  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu))
  }
})()
// 获取菜单
async function getAsyncMenus() {
  const permissionStore = usePermissionStore()
  //递归过滤所有隐藏的菜单
  const menuFilter = (items) => {
    return items.filter((item) => {
      const show = !item.meta?.hideMenu && !item.hideMenu
      if (show && item.children) {
        item.children = menuFilter(item.children)
      }
      return show
    })
  }
  if (isBackMode()) {
    return menuFilter(permissionStore.getBackMenuList)
  }
  if (isFrontMode()) {
    return menuFilter(permissionStore.getFrontMenuList)
  }
  return staticMenus
}
// 获取菜单
export const getMenus = async (): Promise<Menu[]> => {
  return await getAsyncMenus()
}
// 获取当前菜单所属父级菜单
export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}
// 获取一级菜单，删除子菜单
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus()
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }))
  return shallowMenuList
}
// 获取菜单的子元素
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[]
  }
  return parent.children
}

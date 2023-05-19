import type { Router } from 'vue-router'
import { PermissionModeEnum } from '@/constants/enums/app-enum'
import { useAppStoreWithOut } from '@/store/app'
import { usePermissionStoreWithOut } from '@/store/permission'
import { configureDynamicParamsMenu } from '../helper/menu-helper'
import { Menu } from '../types'

// 带参路由
export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    if (!to.name) {
      next()
      return
    }
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    } else if (isFrontMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}

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

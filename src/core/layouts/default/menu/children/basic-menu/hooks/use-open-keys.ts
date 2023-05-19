import type { Menu as MenuType } from '@/router/types'
import type { MenuState } from '../types'
import { computed, Ref, toRaw, unref } from 'vue'
import { uniq } from 'lodash-es'
import { MenuModeEnum } from '@/constants/enums/menu-enum'
import { useMenuConfig } from '@/hooks/config/use-menu-config'
import { getAllParentPath } from '@/router/helper/menu-helper'
import { useTimeoutFn } from '@/hooks/core/use-timeout'

export function useOpenKeys(menuState: MenuState, menus: Ref<MenuType[]>, mode: Ref<MenuModeEnum>, accordion: Ref<boolean>) {
  // 获取菜单配置
  const { getCollapsed, getIsMixSidebar } = useMenuConfig()
  // 设置打开菜单key(path)
  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL) {
      return
    }
    const native = unref(getIsMixSidebar)
    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value)
        if (menuList?.length === 0) {
          menuState.openKeys = []
          return
        }
        if (!unref(accordion)) {
          menuState.openKeys = uniq([...menuState.openKeys, ...getAllParentPath(menuList, path)])
        } else {
          menuState.openKeys = getAllParentPath(menuList, path)
        }
      },
      16,
      !native
    )
  }
  // 获取已打开菜单key(path)
  const getOpenKeys = computed(() => {
    const collapse = unref(getIsMixSidebar) ? false : unref(getCollapsed)
    return collapse ? menuState.collapsedOpenKeys : menuState.openKeys
  })

  /**
   * @description:  重置值
   */
  function resetKeys() {
    menuState.selectedKeys = []
    menuState.openKeys = []
  }

  /**
   * 菜单切换
   */
  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion) || unref(getIsMixSidebar)) {
      menuState.openKeys = openKeys
    } else {
      const rootSubMenuKeys: string[] = []
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path)
        }
      }
      if (!unref(getCollapsed)) {
        const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1)
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          menuState.openKeys = openKeys
        } else {
          menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      } else {
        menuState.collapsedOpenKeys = openKeys
      }
    }
  }
  return { getOpenKeys, setOpenKeys, resetKeys, handleOpenChange }
}

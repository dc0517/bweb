import type { Menu } from '@/router/types'
import type { Ref } from 'vue'
import { watch, unref, ref, computed } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { MenuSplitTyeEnum } from '@/constants/enums/menu-enum'
import { useMenuConfig } from '@/hooks/config/use-menu-config'
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from '@/router/menus'
import { usePermissionStore } from '@/store/permission'

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
  const menusRef = ref<Menu[]>([])
  const { currentRoute } = useRouter()
  const permissionStore = usePermissionStore()
  const { setMenuConfig, getIsHorizontal, getSplit } = useMenuConfig()

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50)

  const splitNotLeft = computed(() => unref(splitType) !== MenuSplitTyeEnum.LEFT && !unref(getIsHorizontal))
  const getSplitLeft = computed(() => !unref(getSplit) || unref(splitType) !== MenuSplitTyeEnum.LEFT)
  const getSpiltTop = computed(() => unref(splitType) === MenuSplitTyeEnum.TOP)
  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTyeEnum.NONE || !unref(getSplit)
  })

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTyeEnum]) => {
      if (unref(splitNotLeft)) return
      const { meta } = unref(currentRoute)
      const currentActiveMenu = meta.currentActiveMenu as string
      let parentPath = await getCurrentParentPath(path)
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu)
      }
      parentPath && throttleHandleSplitLeftMenu(parentPath)
    },
    {
      immediate: true
    }
  )

  // 菜单change事件
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus()
    },
    {
      immediate: true
    }
  )

  // 拆分菜单更改
  watch(
    () => getSplit.value,
    () => {
      if (unref(splitNotLeft)) return
      genMenus()
    }
  )

  // 左侧菜单分割处理
  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft)) return
    const children = await getChildrenMenus(parentPath)
    if (!children || !children.length) {
      setMenuConfig({ hidden: true })
      menusRef.value = []
      return
    }
    setMenuConfig({ hidden: false })
    menusRef.value = children
  }

  // 获取菜单数组
  async function genMenus() {
    // normal mode
    if (unref(normalType)) {
      menusRef.value = await getMenus()
      return
    }
    // split-top
    if (unref(getSpiltTop)) {
      const shallowMenus = await getShallowMenus()
      menusRef.value = shallowMenus
      return
    }
  }

  return { menusRef }
}

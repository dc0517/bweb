import type { MenuConfig } from '@/constants/constants/config'
import { computed, unref, ref } from 'vue'
import { useAppStore } from '@/store/app'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/constants/enums/app-enum'
import { MenuModeEnum, MenuTypeEnum } from '@/constants/enums/menu-enum'
import { useFullContent } from '@/hooks/web/use-full-content'

const mixSideHasChildren = ref(false)

/**
 * 菜单配置
 * @returns
 */
export function useMenuConfig() {
  const { getFullContent: fullContent } = useFullContent()
  const appStore = useAppStore()
  // 是否折叠菜单
  const getCollapsed = computed(() => appStore.getMenuConfig.collapsed)
  // 菜单类型
  const getMenuType = computed(() => appStore.getMenuConfig.type)
  // 菜单模式
  const getMenuMode = computed(() => appStore.getMenuConfig.mode)
  // 菜单是否显示
  const getShowMenu = computed(() => appStore.getMenuConfig.show)
  // 菜单是否隐藏
  const getMenuHidden = computed(() => appStore.getMenuConfig.hidden)
  // 菜单宽度
  const getMenuWidth = computed(() => appStore.getMenuConfig.menuWidth)
  // 菜单是否分割
  const getSplit = computed(() => appStore.getMenuConfig.split)
  // 侧边栏手风琴模式
  const getAccordion = computed(() => appStore.getMenuConfig.accordion)
  // 固定混合侧边栏
  const getMixSideFixed = computed(() => appStore.getMenuConfig.mixSideFixed)
  // 是否侧边栏
  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)
  // 菜单是否显示顶部
  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)
  // 折叠是否显示标题
  const getCollapsedShowTitle = computed(() => appStore.getMenuConfig.collapsedShowTitle)
  // 显示混合菜单
  const getShowSidebar = computed(() => {
    return unref(getSplit) || (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
  })
  // 是否显示顶部菜单
  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit)
  })
  // 菜单是否水平模式
  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })
  // 是否混合侧边栏
  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })
  // 混合菜单
  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
  })
  // 菜单宽度
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })
  // 获取最小宽度
  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle, siderHidden } = appStore.getMenuConfig
    return siderHidden ? 0 : collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })
  // 计算内容宽度
  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
        : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })
  // 菜单配置
  function setMenuConfig(menuConfig: Partial<MenuConfig>): void {
    appStore.setProjectConfig({ menuConfig })
  }
  // 折叠器切换
  function toggleCollapsed() {
    setMenuConfig({
      collapsed: !unref(getCollapsed)
    })
  }
  return {
    setMenuConfig,
    toggleCollapsed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getSplit,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getMenuHidden,
    getIsTopMenu,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getMixSideFixed,
    mixSideHasChildren
  }
}

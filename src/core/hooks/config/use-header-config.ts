import type { HeaderConfig } from '@s/types/config'
import { computed, unref } from 'vue'
import { MenuModeEnum } from '@/constants/enums/menu-enum'
import { useMenuConfig } from '@/hooks/config/use-menu-config'
import { useRootConfig } from '@/hooks/config/use-root-config'
import { useAppStore } from '@/store/app'

export function useHeaderConfig() {
  const appStore = useAppStore()

  const { getMenuMode, getSplit } = useMenuConfig()

  const { getShowBreadCrumb } = useRootConfig()

  // 是否显示Header
  const getShowHeader = computed(() => appStore.getHeaderConfig.show)

  // 是否显示全屏
  const getShowFullScreen = computed(() => appStore.getHeaderConfig.showFullScreen)

  // 是否显示面包屑
  const getShowBread = computed(() => {
    return unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
  })

  function setHeaderConfig(headerConfig: Partial<HeaderConfig>) {
    appStore.setProjectConfig({ headerConfig })
  }
  return {
    setHeaderConfig,
    getShowFullScreen,
    getShowBread,
    getShowHeader
  }
}

import type { HeaderConfig } from '@s/types/config'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

export function useHeaderConfig() {
  const appStore = useAppStore()

  // 是否显示Header
  const getShowHeader = computed(() => appStore.getHeaderConfig.show)

  // 是否显示全屏
  const getShowFullScreen = computed(() => appStore.getHeaderConfig.showFullScreen)

  function setHeaderConfig(headerConfig: Partial<HeaderConfig>) {
    appStore.setProjectConfig({ headerConfig })
  }
  return {
    setHeaderConfig,
    getShowFullScreen,
    getShowHeader
  }
}

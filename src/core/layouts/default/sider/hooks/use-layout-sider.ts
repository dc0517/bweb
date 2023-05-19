import { computed, unref } from 'vue'
import { useMenuConfig } from '@/hooks/config/use-menu-config'
import { useAppStore } from '@/store/app'

/**
 * 菜单事件
 */
export function useSiderEvent() {
  const appStore = useAppStore()
  const { getMiniWidthNumber } = useMenuConfig()

  const getCollapsedWidth = computed(() => {
    return unref(getMiniWidthNumber)
  })

  function onBreakpointChange(broken: boolean) {
    appStore.setProjectConfig({
      menuConfig: {
        siderHidden: broken
      }
    })
  }

  return { getCollapsedWidth, onBreakpointChange }
}

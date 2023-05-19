import type { TransitionConfig } from '@/constants/constants/config'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

export function useTransitionConfig() {
  const appStore = useAppStore()
  // 页面切换是否启用动画
  const getEnableTransition = computed(() => appStore.getTransitionConfig?.enable)
  // 是否打开顶部进度条
  const getOpenNProgress = computed(() => appStore.getTransitionConfig?.openNProgress)
  // 是否打开页面切换加载
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionConfig?.openPageLoading
  })
  // 路由切换动画
  const getBasicTransition = computed(() => appStore.getTransitionConfig?.basicTransition)
  // 动画交互设置
  function setTransitionConfig(transitionConfig: Partial<TransitionConfig>) {
    appStore.setProjectConfig({ transitionConfig })
  }
  return {
    setTransitionConfig,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition
  }
}

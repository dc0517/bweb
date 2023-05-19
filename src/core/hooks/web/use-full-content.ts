import { computed, unref } from 'vue'
import { useAppStore } from '@/store/app'
import { useRouter } from 'vue-router'

/**
 * 全屏显示内容
 */
export const useFullContent = () => {
  const appStore = useAppStore()
  const router = useRouter()
  const { currentRoute } = router
  // 是否全屏显示而不显示菜单
  const getFullContent = computed(() => {
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) {
      return true
    }
    return appStore.getProjectConfig.fullContent
  })
  return { getFullContent }
}

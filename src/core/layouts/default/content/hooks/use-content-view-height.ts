import { ref, computed, unref } from 'vue'
import { createPageContext } from '@/hooks/component/use-page-context'
import { useWindowSizeFn } from '@/hooks/event/use-window-size'

const headerHeightRef = ref(0)
const footerHeightRef = ref(0)

/**
 * 布局高度
 */
export function useLayoutHeight() {
  function setHeaderHeight(val) {
    headerHeightRef.value = val
  }
  function setFooterHeight(val) {
    footerHeightRef.value = val
  }
  return { headerHeightRef, footerHeightRef, setHeaderHeight, setFooterHeight }
}

/**
 * 视图区域高度
 */
export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight)
  const pageHeight = ref(window.innerHeight)
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) - unref(footerHeightRef) || 0
  })

  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight
    },
    100,
    { immediate: true }
  )

  async function setPageHeight(height: number) {
    pageHeight.value = height
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight
  })
}

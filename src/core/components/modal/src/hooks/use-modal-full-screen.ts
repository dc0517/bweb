import { computed, Ref, ref, unref } from 'vue'

export interface UseFullScreenContext {
  wrapClassName: Ref<string | undefined>
  modalWrapperRef: Ref<ComponentRef>
  extHeightRef: Ref<number>
}

/**
 * 全屏 hooks
 * @param context
 * @returns
 */
export function useFullScreen(context: UseFullScreenContext) {
  const fullScreenRef = ref(false)

  const getWrapClassName = computed(() => {
    const clsName = unref(context.wrapClassName) || ''
    return unref(fullScreenRef) ? `fullscreen-modal ${clsName} ` : unref(clsName)
  })

  function handleFullScreen(e: Event) {
    e && e.stopPropagation()
    fullScreenRef.value = !unref(fullScreenRef)
  }
  return { getWrapClassName, fullScreenRef, handleFullScreen }
}

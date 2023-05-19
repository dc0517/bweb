import { ref, computed, ComputedRef, unref } from 'vue'
import { useEventListener } from '@/hooks/event/use-event-listener'
import { screenMap, SizeEnum, ScreenEnum } from '@/constants/enums/breakpoint-enum'

let globalScreenRef: ComputedRef<SizeEnum | undefined>
let globalWidthRef: ComputedRef<number>
let globalRealWidthRef: ComputedRef<number>

export interface CreateCallbackParams {
  screen: ComputedRef<SizeEnum | undefined>
  width: ComputedRef<number>
  realWidth: ComputedRef<number>
  screenEnum: typeof ScreenEnum
  screenMap: Map<SizeEnum, number>
  sizeEnum: typeof SizeEnum
}

export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum: ScreenEnum,
    realWidthRef: globalRealWidthRef
  }
}

export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  const screenRef = ref<SizeEnum>(SizeEnum.XL)
  const realWidthRef = ref(window.innerWidth)

  function getWindowWidth() {
    const width = document.body.clientWidth
    const xs = screenMap.get(SizeEnum.XS)!
    const sm = screenMap.get(SizeEnum.SM)!
    const md = screenMap.get(SizeEnum.MD)!
    const lg = screenMap.get(SizeEnum.LG)!
    const xl = screenMap.get(SizeEnum.XL)!
    if (width < xs) {
      screenRef.value = SizeEnum.XS
    } else if (width < sm) {
      screenRef.value = SizeEnum.SM
    } else if (width < md) {
      screenRef.value = SizeEnum.MD
    } else if (width < lg) {
      screenRef.value = SizeEnum.LG
    } else if (width < xl) {
      screenRef.value = SizeEnum.XL
    } else {
      screenRef.value = SizeEnum.XXL
    }
    realWidthRef.value = width
  }

  useEventListener({
    el: window,
    name: 'resize',
    listener: () => {
      getWindowWidth()
      resizeFn()
    },
    wait: 100
  })

  getWindowWidth()
  globalScreenRef = computed(() => unref(screenRef))
  globalWidthRef = computed((): number => screenMap.get(unref(screenRef)!)!)
  globalRealWidthRef = computed((): number => unref(realWidthRef))

  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenMap,
      screenEnum: ScreenEnum,
      sizeEnum: SizeEnum
    })
  }

  resizeFn()
  return {
    screenEnum: ScreenEnum,
    screenRef: globalScreenRef,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef
  }
}

<script lang="ts">
  import { defineComponent, toRefs, ref, unref } from 'vue'
  import { prefixCls } from '@/config/design-config'
  import { createAppProviderContext } from '@/hooks/web/use-app-context'
  import { createBreakpointListen } from '@/hooks/event/use-breakpoint'
  import { useAppStore } from '@/store/app'

  const props = {
    prefixCls: { type: String, default: prefixCls }
  }

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false)
      const isSetState = ref(false)
      const { prefixCls } = toRefs(props)

      const appStore = useAppStore()
      // 监视屏幕断点信息更改
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG)
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth
        }
        handleRestoreState()
      })
      // 全局注入
      createAppProviderContext({ prefixCls, isMobile })
      /**
       * 窗口更改之前维护状态
       */
      function handleRestoreState() {
        if (unref(isSetState)) {
          isSetState.value = false
          const { menuMode, menuCollapsed, menuType, menuSplit } = appStore.getBeforeMiniInfo
          appStore.setProjectConfig({
            menuSetting: {
              type: menuType,
              mode: menuMode,
              collapsed: menuCollapsed,
              split: menuSplit
            }
          })
        }
      }
      return () => slots.default?.()
    }
  })
</script>

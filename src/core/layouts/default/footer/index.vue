<template>
  <LFooter :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
    <div>Copyright &copy;2023 上海飞未信息技术有限公司</div>
  </LFooter>
</template>

<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import { openWindow } from '@/utils'
  import { useRootConfig } from '@/hooks/config/use-root-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { useLayoutHeight } from '../content/hooks/use-content-view-height'

  export default defineComponent({
    name: 'LayoutFooter',
    components: { LFooter: Layout.Footer },
    setup() {
      const { getShowFooter } = useRootConfig()
      const { currentRoute } = useRouter()
      const { prefixCls } = useDesign('layout-footer')

      const footerRef = ref<ComponentRef>(null)
      const { setFooterHeight } = useLayoutHeight()

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el
          setFooterHeight(footerEl?.offsetHeight || 0)
        } else {
          setFooterHeight(0)
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
      })

      return {
        getShowLayoutFooter,
        prefixCls,
        footerRef,
        openWindow
      }
    }
  })
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';
  @normal-color: rgba(0, 0, 0, 0.45);
  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;
  }
</style>

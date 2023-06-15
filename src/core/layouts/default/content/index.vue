<template>
  <div :class="[prefixCls, getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
    <PageLayout />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import PageLayout from '@/layouts/page/index.vue'
  import { useDesign } from '@/hooks/web/use-design'
  import { useHeaderConfig } from '@/hooks/config/use-header-config'
  import { useRootConfig } from '@/hooks/config/use-root-config'
  import { useTransitionConfig } from '@/hooks/config/use-transition-config'
  import { useContentViewHeight } from './hooks/use-content-view-height'

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { prefixCls } = useDesign('layout-content')
      const { getOpenPageLoading } = useTransitionConfig()
      const { getShowBread } = useHeaderConfig()
      const { getLayoutContentMode, getPageLoading } = useRootConfig()

      useContentViewHeight()
      return {
        prefixCls,
        getOpenPageLoading,
        getLayoutContentMode,
        getPageLoading,
        getShowBread
      }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    padding: 16px 16px 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }
  }
</style>

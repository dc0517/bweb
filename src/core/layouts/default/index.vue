<template>
  <Layout :class="prefixCls">
    <LayoutFeatures />
    <LayoutHeader fixed />
    <Layout :class="[layoutClass]">
      <LayoutSideBar />
      <Layout :class="`${prefixCls}-main`">
        <LayoutBreadcrumb v-if="isShowBreadCrumb" />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, computed, watch } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { createAsyncComponent } from '@/utils/async-component'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useRootConfig } from '@/hooks/config/use-root-config'
  import { useDesign } from '@/hooks/web/use-design'
  import LayoutHeader from './header/index.vue'
  import LayoutBreadcrumb from './breadcrumb/index.vue'
  import LayoutContent from './content/index.vue'
  import LayoutSideBar from './sider/index.vue'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('@/layouts/default/feature/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('@/layouts/default/footer/index.vue')),
      LayoutHeader,
      LayoutBreadcrumb,
      LayoutContent,
      LayoutSideBar,
      Layout
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')
      const { getShowBreadCrumb } = useRootConfig()
      const isShowBreadCrumb = ref(unref(getShowBreadCrumb))
      watch(
        () => getShowBreadCrumb,
        (result) => {
          isShowBreadCrumb.value = result.value
        },
        {
          deep: true
        }
      )

      const layoutClass: string[] = ['ant-layout', 'ant-layout-has-sider']

      return {
        prefixCls,
        layoutClass,
        isShowBreadCrumb
      }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
      margin-top: 80px;
    }
  }
</style>

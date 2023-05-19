<template>
  <div class="side-bar-hidden" v-show="isShowSideBar"></div>
  <Sider v-show="isShowSideBar" theme="light" breakpoint="lg" :class="getSiderClass" :width="getMenuWidth" @breakpoint="onBreakpointChange">
    <LayoutMenu :menuMode="getMode" :splitType="getSplitType" />
  </Sider>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, CSSProperties, h } from 'vue'
  import { Layout } from 'ant-design-vue'
  import LayoutMenu from '@/layouts/default/menu/index.vue'
  import { MenuModeEnum, MenuSplitTyeEnum } from '@/constants/enums/menu-enum'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { useSiderEvent } from './hooks/use-layout-sider'
  export default defineComponent({
    name: 'LayoutSideBar',
    components: { Sider: Layout.Sider, LayoutMenu },
    setup() {
      const { getMenuWidth, getSplit, getMenuHidden, getIsMixMode } = useMenuConfig()

      const { prefixCls } = useDesign('layout-side-bar')

      const { onBreakpointChange } = useSiderEvent()

      const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.INLINE : null
      })

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE
      })

      const isShowSideBar = computed(() => {
        return unref(getSplit) ? !unref(getMenuHidden) : true
      })

      const getSiderClass = computed(() => {
        return [prefixCls, `${prefixCls}--fixed`, `${prefixCls}--mix`]
      })

      return {
        prefixCls,
        getSiderClass,
        getMenuWidth,
        getMode,
        getSplitType,
        isShowSideBar,
        onBreakpointChange
      }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-side-bar';

  .side-bar-hidden {
    width: @sider-menu-width;
    overflow: hidden;
    flex: 0 0 @sider-menu-width;
    max-width: @sider-menu-width;
    min-width: @sider-menu-width;
    transition: all 0.2s;
  }

  .@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: @header-height;
      height: calc(100% - @header-height);
    }

    .ant-layout-sider-zero-width-trigger {
      top: 40%;
      z-index: 10;
    }

    & .ant-layout-sider-trigger {
      height: 36px;
      line-height: 36px;
    }
  }
</style>

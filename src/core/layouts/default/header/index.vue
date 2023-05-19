<template>
  <Header :class="getHeaderClass">
    <!-- 左侧 start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo :class="`${prefixCls}-logo`" />
    </div>
    <!-- 左侧 end -->

    <!-- 菜单 start -->
    <div :class="`${prefixCls}-menu`">
      <LayoutMenu isHorizontal :splitType="getSplitType" :menuMode="getMenuMode" />
    </div>
    <!-- 菜单 end -->

    <!-- 操作 start -->
    <div :class="`${prefixCls}-action`">
      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />
      <UserDropDown />
    </div>
    <!-- 操作 end -->
  </Header>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { AppLogo } from '@/components/application'
  import { MenuModeEnum, MenuSplitTyeEnum } from '@/constants/enums/menu-enum'
  import { useHeaderConfig } from '@/hooks/config/use-header-config'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { propTypes } from '@/utils/prop-types'
  import { UserDropDown, FullScreen } from './components'
  import LayoutMenu from '../menu/index.vue'

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AppLogo,
      Header: Layout.Header,
      LayoutMenu,
      UserDropDown,
      FullScreen
    },
    props: {
      fixed: propTypes.bool
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header')
      const { getSplit } = useMenuConfig()
      const { getShowFullScreen } = useHeaderConfig()

      const getHeaderClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed
          }
        ]
      })

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE
      })

      const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null
      })

      return {
        prefixCls,
        getHeaderClass,
        getSplitType,
        getSplit,
        getMenuMode,
        getShowFullScreen
      }
    }
  })
</script>
<style lang="less">
  @import './index.less';
</style>

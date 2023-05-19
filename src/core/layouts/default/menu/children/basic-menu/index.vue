<template>
  <Menu
    :class="getMenuClass"
    :defaultSelectedKeys="defaultSelectedKeys"
    :openKeys="getOpenKeys"
    :selectedKeys="selectedKeys"
    :subMenuOpenDelay="0.2"
    :inlineIndent="inlineIndent"
    :mode="mode"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
    v-bind="getInlineCollapseOptions"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts">
  import type { MenuState } from './types'
  import { computed, defineComponent, unref, reactive, watch, toRefs, ref } from 'vue'
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
  import { Menu } from 'ant-design-vue'
  import { REDIRECT_NAME } from '@/constants/constants/route'
  import { MenuModeEnum, MenuTypeEnum } from '@/constants/enums/menu-enum'
  import { isFunction } from '@/utils/is'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { listenerRouteChange } from '@/logics/mitt/route-change'
  import { getCurrentParentPath } from '@/router/menus'
  import { getAllParentPath } from '@/router/helper/menu-helper'
  import { useOpenKeys } from './hooks/use-open-keys'
  import BasicSubMenuItem from './components/basic-sub-menu-item.vue'
  import { basicProps } from './props'

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu,
      BasicSubMenuItem
    },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false)
      const currentActiveMenu = ref('') // 激活菜单
      // 菜单状态
      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
        collapsedOpenKeys: []
      })
      const { prefixCls } = useDesign('basic-menu')
      const { items, mode, accordion } = toRefs(props)
      const { getCollapsed, getSplit } = useMenuConfig()
      const { currentRoute } = useRouter()
      // 菜单操作
      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, mode as any, accordion)
      // 菜单是否在顶部
      const getIsTopMenu = computed(() => {
        const { type, mode } = props
        return (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) || (props.isHorizontal && unref(getSplit))
      })
      // 菜单class
      const getMenuClass = computed(() => {
        return [
          prefixCls,
          `justify-center`,
          {
            [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
            [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu)
          }
        ]
      })
      // 获取内联折叠选项
      const getInlineCollapseOptions = computed(() => {
        const isInline = props.mode === MenuModeEnum.INLINE
        const inlineCollapseOptions: { inlineCollapsed?: boolean } = {}
        if (isInline) {
          inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed)
        }
        return inlineCollapseOptions
      })
      // 监听路由变化
      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return
        handleMenuChange(route)
        currentActiveMenu.value = route.meta?.currentActiveMenu as string

        if (unref(currentActiveMenu)) {
          menuState.selectedKeys = [unref(currentActiveMenu)]
          setOpenKeys(unref(currentActiveMenu))
        }
      })

      !props.mixSider &&
        watch(
          () => props.items,
          () => {
            handleMenuChange()
          }
        )
      // 路由点击事件
      async function handleMenuClick({ key }: { key: string; keyPath: string[] }) {
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)

        isClickGo.value = true
        menuState.selectedKeys = [key]
      }
      // 路由切换
      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false
          return
        }
        const path = (route || unref(currentRoute)).meta?.currentActiveMenu || (route || unref(currentRoute)).path
        setOpenKeys(path)
        if (unref(currentActiveMenu)) return
        if (props.isHorizontal && unref(getSplit)) {
          const parentPath = await getCurrentParentPath(path)
          menuState.selectedKeys = [parentPath]
        } else {
          const parentPaths = await getAllParentPath(props.items, path)
          menuState.selectedKeys = parentPaths
        }
      }

      return {
        getInlineCollapseOptions,
        getMenuClass,
        getOpenKeys,
        handleMenuClick,
        handleOpenChange,
        ...toRefs(menuState)
      }
    }
  })
</script>

<style lang="less">
  @import './index.less';
</style>

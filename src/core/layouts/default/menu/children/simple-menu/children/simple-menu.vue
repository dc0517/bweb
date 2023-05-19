<template>
  <Menu
    v-bind="getBindValues"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu :item="item" :parent="true" :collapsedShowTitle="collapsedShowTitle" :collapse="collapse" />
    </template>
  </Menu>
</template>

<script lang="ts">
  import type { MenuState } from '../types'
  import type { Menu as MenuType } from '@/router/types'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'
  import { defineComponent, computed, ref, unref, reactive, toRefs, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useDesign } from '@/hooks/web/use-design'
  import { listenerRouteChange } from '@/logics/mitt/route-change'
  import { REDIRECT_NAME } from '@/constants/constants/route'
  import { openWindow } from '@/utils'
  import { isFunction, isUrl } from '@/utils/is'
  import { propTypes } from '@/utils/prop-types'
  import Menu from '../components/menu.vue'
  import SimpleSubMenu from '../components/simple-sub-menu.vue'
  import { useOpenKeys } from '../hooks/use-open-keys'
  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      Menu,
      SimpleSubMenu
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      },
      // 是否折叠菜单
      collapse: propTypes.bool,
      // 是否混合侧边栏
      mixSider: propTypes.bool,
      // 手风琴模式，只展示一个菜单
      accordion: propTypes.bool.def(true),
      // 折叠菜单是否显示标题
      collapsedShowTitle: propTypes.bool,
      // 是否分割菜单
      isSplitMenu: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>
      }
    },
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref('')
      const isClickGo = ref(false)
      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: []
      })

      const { currentRoute } = useRouter()
      const { prefixCls } = useDesign('simple-menu')
      const { items, accordion, mixSider, collapse } = toRefs(props)
      const { setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, accordion, mixSider, collapse)

      const getBindValues = computed(() => ({ ...attrs, ...props }))

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = []
          } else {
            setOpenKeys(currentRoute.value.path)
          }
        },
        { immediate: true }
      )

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            return
          }
          setOpenKeys(currentRoute.value.path)
        },
        { flush: 'post' }
      )

      /**
       * 监听路由变化
       */
      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return

        currentActiveMenu.value = route.meta?.currentActiveMenu as string
        handleMenuChange(route)

        if (unref(currentActiveMenu)) {
          menuState.activeName = unref(currentActiveMenu)
          setOpenKeys(unref(currentActiveMenu))
        }
      })

      /**
       * 菜单切换
       */
      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false
          return
        }
        const path = (route || unref(currentRoute)).path
        menuState.activeName = path
        setOpenKeys(path)
      }

      /**
       * 选中菜单
       */
      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key)
          return
        }
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)
        isClickGo.value = true
        setOpenKeys(key)
        menuState.activeName = key
      }

      return {
        prefixCls,
        getBindValues,
        getOpenKeys,
        handleSelect,
        ...toRefs(menuState)
      }
    }
  })
</script>

<style lang="less">
  @import '../index.less';
</style>

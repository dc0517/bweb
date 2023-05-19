<template>
  <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" v-bind="$props" />
  <SubMenu v-if="menuHasChildren(item) && getShowMenu" :key="`submenu-${item.path}`" popupClassName="app-top-menu-popup">
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" />
    </template>
    <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
      <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
    </template>
  </SubMenu>
</template>

<script lang="ts">
  import type { Menu as MenuType } from '/@/router/types'
  import { defineComponent, computed } from 'vue'
  import { Menu } from 'ant-design-vue'
  import { useDesign } from '@/hooks/web/use-design'
  import BasicMenuItem from './basic-menu-item.vue'
  import MenuItemContent from './menu-item-content.vue'
  import { itemProps } from '../props'

  export default defineComponent({
    name: 'BasicSubMenuItem',
    isSubMenu: true,
    components: {
      BasicMenuItem,
      SubMenu: Menu.SubMenu,
      MenuItemContent
    },
    props: itemProps,
    setup(props) {
      const { prefixCls } = useDesign('basic-menu-item')

      const getShowMenu = computed(() => !props.item.meta?.hideMenu)

      /**
       * 是否包含子菜单
       */
      function menuHasChildren(menuTreeItem: MenuType): boolean {
        return (
          !menuTreeItem.meta?.hideChildrenInMenu &&
          Reflect.has(menuTreeItem, 'children') &&
          !!menuTreeItem.children &&
          menuTreeItem.children.length > 0
        )
      }

      return {
        prefixCls,
        getShowMenu,
        menuHasChildren
      }
    }
  })
</script>

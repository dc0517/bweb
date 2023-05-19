<script lang="tsx">
  import type { PropType, CSSProperties } from 'vue'
  import { computed, defineComponent, unref, toRef } from 'vue'
  import { AppLogo } from '@/components/application'
  import { ScrollContainer } from '@/components/container'
  import { MenuModeEnum, MenuSplitTyeEnum } from '@/constants/enums/menu-enum'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useGo } from '@/hooks/web/use-page'
  import { useDesign } from '@/hooks/web/use-design'
  import { openWindow } from '@/utils'
  import { isUrl } from '@/utils/is'
  import { propTypes } from '@/utils/prop-types'
  import { useSplitMenu } from './hooks/use-layout-menu'
  import BasicMenu from './children/basic-menu/index.vue'
  import { SimpleMenu } from './children/simple-menu'

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      splitType: {
        type: Number as PropType<MenuSplitTyeEnum>,
        default: MenuSplitTyeEnum.NONE
      },
      isHorizontal: propTypes.bool,
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: ''
      }
    },
    setup(props) {
      const go = useGo()

      const { getMenuMode, getMenuType, getCollapsed, getCollapsedShowTitle, getAccordion, getIsHorizontal, getIsSidebarType, getSplit } =
        useMenuConfig()

      const { prefixCls } = useDesign('layout-menu')

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'))

      // 菜单模式
      const getComputedMenuMode = computed(() => props.menuMode || unref(getMenuMode))

      // 是否使用滚动
      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) || props.splitType === MenuSplitTyeEnum.LEFT || props.splitType === MenuSplitTyeEnum.NONE)
        )
      })

      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          items: menus,
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
          beforeClickFn: beforeMenuClickFn,
          onMenuClick: handleMenuClick
        }
      })

      /**
       * click menu
       * @param menu
       */

      function handleMenuClick(path: string) {
        go(path)
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true
        }
        openWindow(path)
        return false
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)
        if (!menus || !menus.length) return null
        return !props.isHorizontal ? (
          <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} />
        ) : (
          <BasicMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            mode={unref(getComputedMenuMode as any)}
            items={menus}
          />
        )
      }

      return () => {
        return <>{unref(getUseScroll) ? <ScrollContainer class="h-full">{() => renderMenu()}</ScrollContainer> : renderMenu()}</>
      }
    }
  })
</script>

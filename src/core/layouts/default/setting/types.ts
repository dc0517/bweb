import { ContentEnum, RouterTransitionEnum } from '@/constants/enums/app-enum'
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/constants/enums/menu-enum'

export enum HandlerEnum {
  CHANGE_LAYOUT,
  // menu
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,
  // header
  HEADER_SHOW,
  HEADER_FIXED,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  SHOW_LOGO,
  SHOW_FOOTER,
  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION
}

export const contentModeOptions = [
  {
    value: ContentEnum.FULL,
    label: '流式'
  },
  {
    value: ContentEnum.FIXED,
    label: '定宽'
  }
]

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: '不显示'
    },
    {
      value: TriggerEnum.FOOTER,
      label: '底部'
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: '顶部'
          }
        ])
  ]
}

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE
].map((item) => {
  return {
    label: item,
    value: item
  }
})

export const menuTypeList = [
  {
    title: '左侧菜单模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR
  },
  {
    title: '顶部菜单混合模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX
  },

  {
    title: '顶部菜单模式',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU
  },
  {
    title: '左侧菜单混合模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR
  }
]

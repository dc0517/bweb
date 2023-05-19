import { useAppStore } from '@/store/app'
import { HandlerEnum } from './types'
import { ProjectConfig } from '@s/types/config'
export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore()
  const config = handler(event, value)
  appStore.setProjectConfig(config)
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const appStore = useAppStore()
  switch (event) {
    case HandlerEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value
      const splitOpt = split === undefined ? { split } : {}
      return {
        menuConfig: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt
        }
      }
    case HandlerEnum.MENU_ACCORDION:
      return { menuConfig: { accordion: value } }
    case HandlerEnum.MENU_TRIGGER:
      return { menuConfig: { trigger: value } }
    case HandlerEnum.MENU_COLLAPSED:
      return { menuConfig: { collapsed: value } }
    case HandlerEnum.MENU_WIDTH:
      return { menuConfig: { menuWidth: value } }
    case HandlerEnum.MENU_SHOW_SIDEBAR:
      return { menuConfig: { show: value } }
    case HandlerEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menuConfig: { collapsedShowTitle: value } }
    case HandlerEnum.MENU_SPLIT:
      return { menuConfig: { split: value } }
    case HandlerEnum.MENU_FIXED:
      return { menuConfig: { fixed: value } }
    case HandlerEnum.MENU_FIXED_MIX_SIDEBAR:
      return { menuConfig: { mixSideFixed: value } }
    // ============transition==================
    case HandlerEnum.OPEN_PAGE_LOADING:
      appStore.setPageLoading(false)
      return { transitionConfig: { openPageLoading: value } }
    case HandlerEnum.ROUTER_TRANSITION:
      return { transitionConfig: { basicTransition: value } }
    case HandlerEnum.OPEN_ROUTE_TRANSITION:
      return { transitionConfig: { enable: value } }
    case HandlerEnum.OPEN_PROGRESS:
      return { transitionConfig: { openNProgress: value } }
    // ============root==================
    case HandlerEnum.FULL_CONTENT:
      return { fullContent: value }
    case HandlerEnum.CONTENT_MODE:
      return { contentMode: value }
    case HandlerEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value }
    case HandlerEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value }
    case HandlerEnum.SHOW_FOOTER:
      return { showFooter: value }
    default:
      return {}
  }
}

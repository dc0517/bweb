export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

/**
 * 菜单类型
 */
export enum MenuTypeEnum {
  // 侧边栏
  SIDEBAR = 'sidebar',
  // 混合侧边栏
  MIX_SIDEBAR = 'mix-sidebar',
  // 混合菜单
  MIX = 'mix',
  // 顶部菜单
  TOP_MENU = 'top-menu'
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER'
}

/**
 * 菜单显示方式
 */
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline'
}

/**
 * 菜单分割类型
 */
export enum MenuSplitTyeEnum {
  NONE,
  TOP,
  LEFT
}

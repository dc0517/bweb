export const SIDE_BAR_MINI_WIDTH = 210
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 210

/**
 * 页面内容
 */
export enum ContentEnum {
  // 流式
  FULL = 'full',
  // 固定宽
  FIXED = 'fixed'
}

/**
 * 会话超时处理
 */
export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // 后端
  BACK = 'BACK',
  // 前端
  FRONT = 'FRONT'
}

/**
 * 路由切换动画
 */
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale'
}

import { ContentEnum, PermissionModeEnum, RouterTransitionEnum, SessionTimeoutProcessingEnum } from '@/constants/enums/app-enum'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '@/constants/enums/menu-enum'

/**
 * 头部配置
 */
export interface HeaderConfig {
  // 是否显示
  show: boolean
  // 是否全屏
  showFullScreen: boolean
}

/**
 * 菜单配置
 */
export interface MenuConfig {
  // 是否显示
  show: boolean
  // 背景色
  bgColor: string
  // 是否固定
  fixed: boolean
  // 是否折叠菜单
  collapsed: boolean
  // 是否隐藏侧边栏
  siderHidden: boolean
  // 是否隐藏
  hidden: boolean
  // 是否分割
  split: boolean
  // 菜单宽度
  menuWidth: number
  // 菜单模式
  mode: MenuModeEnum
  // 菜单类型
  type: MenuTypeEnum
  // 折叠触发器位置
  trigger: TriggerEnum
  // 侧边菜单手风琴模式
  accordion: boolean
  // 折叠显示标题
  collapsedShowTitle: boolean
  // 固定混合侧边栏
  mixSideFixed: boolean
}

/**
 * 动画配置
 */
export interface TransitionConfig {
  // 页面切换是否启用动画
  enable: boolean
  // 路由切换动画
  basicTransition: RouterTransitionEnum
  // 是否打开页面切换加载
  openPageLoading: boolean
  // 是否打开顶部进度条
  openNProgress: boolean
}

/**
 * 项目配置
 */
export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean
  // 权限模式
  permissionMode: PermissionModeEnum
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // 系统主题色
  themeColor: string
  // 主界面全屏显示，菜单不显示，顶部
  fullContent: boolean
  // 内容宽度
  contentMode: ContentEnum
  // 是否显示全局页脚
  showFooter: boolean
  // 顶部配置
  headerConfig: HeaderConfig
  // 菜单配置
  menuConfig: MenuConfig
  // 动画配置
  transitionConfig: TransitionConfig
  // 是否启用keep-alive
  openKeepAlive: boolean
  // 是否显示面包屑
  showBreadCrumb: boolean
  // 是否显示面包屑icon
  showBreadCrumbIcon: boolean
  // 是否使用全局错误捕获
  useErrorHandle: boolean
  // 是否打开回到顶部
  useOpenBackTop: boolean
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean
  // 切换接口时是否删除未关闭消息并通知
  closeMessageOnSwitch: boolean
  // 切换接口时，是否取消已经发送但没有响应的http请求
  removeAllHttpPending: boolean
}

/**
 * 全局配置
 */
export interface GlobConfig {
  // 系统主题
  title: string
  // 接口请求地址
  apiUrl: string
  // 接口请求url前缀
  urlPrefix?: string
  // 项目缩写
  shortName: string
}

/**
 * 全局Env配置
 */
export interface GlobEnvConfig {
  // 系统主题
  VITE_GLOB_APP_TITLE: string
  // 接口请求地址
  VITE_GLOB_API_URL: string
  // 接口请求地址前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string
}

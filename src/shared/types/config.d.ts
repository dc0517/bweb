import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '@/constants/enums/menu-enum'
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum, SessionTimeoutProcessingEnum } from '@/constants/enums/app-enum'

export type LocaleType = 'zh_CN'

// 菜单配置
export interface MenuConfig {
  // 背景色
  bgColor: string
  // 是否固定
  fixed: boolean
  // 是否折叠
  collapsed: boolean
  // 侧边栏是否隐藏
  siderHidden: boolean
  // 是否显示
  show: boolean
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
  // 手风琴模式，只展示一个菜单
  accordion: boolean
  // 折叠菜单时候是否显示菜单名
  collapsedShowTitle: boolean
  // 是否固定左侧混合菜单
  mixSideFixed: boolean
}

// 头部配置
export interface HeaderConfig {
  // 是否显示
  show: boolean
  // 显示全屏按钮
  showFullScreen: boolean
}

// 动画配置
export interface TransitionConfig {
  // 是否开启切换动画
  enable: boolean
  // 动画名
  basicTransition: RouterTransitionEnum
  // 是否打开页面切换loading
  openPageLoading: boolean
  // 是否打开页面切换顶部进度条
  openNProgress: boolean
}

// 项目配置
export interface ProjectConfig {
  // 是否显示配置按钮
  showSettingButton: boolean
  // 权限模式 【FRONT: 前端模式；BACK：后端模式】
  permissionMode: PermissionModeEnum
  // 会话超时处理方案
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // 项目主题色
  themeColor: string
  // 是否取消菜单【顶部或多标签页显示, 可能内嵌在别的系统内】
  fullContent: boolean
  // 主题内容宽度
  contentMode: ContentEnum
  // 是否显示底部信息
  showFooter: boolean
  // 头部配置
  headerConfig: HeaderConfig
  // 菜单配置
  menuConfig: MenuConfig
  // 动画配置
  transitionConfig: TransitionConfig
  // 是否开启KeepAlive缓存
  openKeepAlive: boolean
  // 显示面包屑
  showBreadCrumb: boolean
  // 显示面包屑图标
  showBreadCrumbIcon: boolean
  // 是否使用全局错误捕获
  useErrorHandle: boolean
  // 是否开启回到顶部
  useOpenBackTop: boolean
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean
  // 切换界面的时候是否删除未关闭的message
  closeMessageOnSwitch: boolean
  // 切换界面的时候是否取消已经发送但是未响应的http请求
  removeAllHttpPending: boolean
}

// 全局配置
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

// 全局环境配置
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

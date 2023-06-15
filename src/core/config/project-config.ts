import type { ProjectConfig } from '@/constants/constants/config'
import { ContentEnum, PermissionModeEnum, RouterTransitionEnum, SessionTimeoutProcessingEnum } from '@/constants/enums/app-enum'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '@/constants/enums/menu-enum'
import { SIDE_BAR_BG_COLOR_LIST } from './design-config'
import { primaryColor } from '../../../build/config/theme-config'

// 更新后清空缓存
const config: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: false,
  // 权限模式 【FRONT: 前端模式；BACK：后端模式】
  permissionMode: PermissionModeEnum.FRONT,
  // 会话超时处理方案
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // 项目主题色
  themeColor: primaryColor,
  // 是否取消菜单【顶部或多标签页显示, 可能内嵌在别的系统内】
  fullContent: false,
  // 主题内容宽度
  contentMode: ContentEnum.FULL,
  // 是否显示底部信息
  showFooter: false,
  // 是否需要模块页
  modulePage: true,
  // 头部配置
  headerConfig: {
    // 是否显示
    show: true,
    // 显示全屏按钮
    showFullScreen: true
  },
  // 菜单配置
  menuConfig: {
    // 是否显示
    show: true,
    // 背景色
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 是否隐藏混合菜单
    siderHidden: false,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否隐藏
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.MIX,
    // 分割菜单
    split: true,
    // 折叠触发器的位置
    trigger: TriggerEnum.NONE,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 是否固定左侧混合菜单
    mixSideFixed: false
  },
  // 动画配置
  transitionConfig: {
    // 是否开启切换动画
    enable: true,
    // 动画名
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // 是否打开页面切换loading
    openPageLoading: true,
    // 是否打开页面切换顶部进度条
    openNProgress: false
  },
  // 是否开启KeepAlive缓存
  openKeepAlive: true,
  // 显示面包屑
  showBreadCrumb: true,
  // 显示面包屑图标
  showBreadCrumbIcon: false,
  // 是否使用全局错误捕获
  useErrorHandle: false,
  // 是否开启回到顶部
  useOpenBackTop: true,
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,
  // 切换界面的时候是否删除未关闭的message
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求
  removeAllHttpPending: false
}

export default config

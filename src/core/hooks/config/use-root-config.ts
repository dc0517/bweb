import type { ProjectConfig } from '@/constants/constants/config'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { ContentEnum } from '@/constants/enums/app-enum'

type RootSetting = Omit<ProjectConfig, 'locale' | 'headerConfig' | 'menuConfig'>

export function useRootConfig() {
  const appStore = useAppStore()
  // 页面加载状态
  const getPageLoading = computed(() => appStore.getPageLoading)
  // 是否开启KeepAlive
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)
  // 是否可以嵌入iframe页面
  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage)
  // 是否加载模块页
  const getShowModulePage = computed(() => appStore.getProjectConfig.modulePage)
  // 权限模式
  const getPermissionMode = computed(() => appStore.getProjectConfig.permissionMode)
  // 内容宽度
  const getContentMode = computed(() => appStore.getProjectConfig.contentMode)
  // 是否打开回到顶部
  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop)
  // 是否显示配置按钮
  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton)
  // 是否使用全局错误捕获
  const getUseErrorHandle = computed(() => appStore.getProjectConfig.useErrorHandle)
  // 是否显示全局页脚
  const getShowFooter = computed(() => appStore.getProjectConfig.showFooter)
  // 是否显示面包屑
  const getShowBreadCrumb = computed(() => appStore.getProjectConfig.showBreadCrumb)
  // 系统主题色
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor)
  // 是否显示面包屑icon
  const getShowBreadCrumbIcon = computed(() => appStore.getProjectConfig.showBreadCrumbIcon)
  // 主界面全屏显示，菜单不显示，顶部
  const getFullContent = computed(() => appStore.getProjectConfig.fullContent)
  // layout内容模式
  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL ? ContentEnum.FULL : ContentEnum.FIXED
  )

  function setRootConfig(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  return {
    setRootConfig,
    getFullContent,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowModulePage,
    getShowSettingButton,
    getShowFooter,
    getContentMode,
    getThemeColor
  }
}

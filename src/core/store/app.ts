import type { ProjectConfig, HeaderConfig, MenuConfig, TransitionConfig } from '@/constants/constants/config'
import type { BeforeMiniState } from '@s/types/store'
import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { deepMerge } from '@/utils'
import { store } from '@s/store'

interface AppState {
  // 页面加载状态
  pageLoading: boolean
  // 项目配置
  projectConfig: ProjectConfig | null
  beforeMiniInfo: BeforeMiniState
}
let timeId: TimeoutHandle
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: {} as ProjectConfig,
    beforeMiniInfo: {}
  }),
  getters: {
    getBeforeMiniInfo(state): BeforeMiniState {
      return state.beforeMiniInfo
    },
    getPageLoading(state): boolean {
      return state.pageLoading
    },
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },
    getHeaderConfig(): HeaderConfig {
      return this.getProjectConfig.headerConfig
    },
    getMenuConfig(): MenuConfig {
      return this.getProjectConfig.menuConfig
    },
    getTransitionConfig(): TransitionConfig {
      return this.getProjectConfig.transitionConfig
    }
  },
  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig, config)
    },
    async resetAllState() {
      resetRouter()
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    }
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 存储方式和内容
    strategies: [{ storage: localStorage, paths: ['projectConfig'] }]
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}

import type { ProjectConfig } from '@s/types/config'
import defaultConfig from '@/config/project-config'
import { useAppStore } from '@/store/app'

// 初始化项目配置
export function initAppConfigStore() {
  const appStore = useAppStore()
  const projCfg: ProjectConfig = defaultConfig
  appStore.setProjectConfig(projCfg)
}

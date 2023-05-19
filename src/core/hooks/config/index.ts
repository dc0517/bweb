import type { GlobConfig } from '@/constants/constants/config'
import { warn } from '@/utils/log'
import { getAppEnvConfig } from '@/utils/env'

/**
 * 全局环境配置
 * @returns
 */
export const useGlobConfig = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig()

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn('VITE_GLOB_APP_SHORT_NAME变量只能是字符/下划线，请在环境变量中修改后重新运行')
  }

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX
  }

  return glob as Readonly<GlobConfig>
}

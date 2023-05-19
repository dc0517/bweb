import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import purgeIcons from 'vite-plugin-purge-icons'
import windiCSS from 'vite-plugin-windicss'
import { compressionPlugin } from './compress'
import { mockPlugin } from './mock'
import { htmlPlugin } from './html'
import { visualizerPlugin } from './visualizer'

export async function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(mockPlugin(isBuild))
  // vite-plugin-html
  vitePlugins.push(htmlPlugin(viteEnv, isBuild))
  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())
  // rollup-plugin-visualizer
  vitePlugins.push(visualizerPlugin())
  // 以下插件只在生产环境中生效
  if (isBuild) {
    vitePlugins.push(compressionPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
  }

  return vitePlugins
}

/**
 * 用于打包和输出gzip文件
 */
import type { PluginOption } from 'vite'
import compression from 'vite-plugin-compression'

export function compressionPlugin(compress: 'gzip' | 'brotli' | 'none', deleteOriginFile = false): PluginOption | PluginOption[] {
  const compressList = compress.split(',')
  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compression({
        ext: '.gz',
        deleteOriginFile
      })
    )
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    )
  }
  return plugins
}

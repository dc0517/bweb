/**
 * 用于打包体积视图分析
 */
import visualizer from 'rollup-plugin-visualizer'
import { isReportMode } from '../utils'

export function visualizerPlugin() {
  if (isReportMode()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }) as Plugin
  }
  return []
}

import type { App } from 'vue'
import { setupLoadingDirective } from './loading/index'

/**
 * 注册全局指令
 * @param app
 */
export function setupGlobDirectives(app: App) {
  setupLoadingDirective(app)
}

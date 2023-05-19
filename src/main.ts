import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import { setupGlobDirectives } from '@/directives'
import { setupErrorHandle } from '@/logics/error-handler'
import { initAppConfigStore } from '@/logics/config/init-config'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupStore } from '@s/store'

async function initConfig() {
  const app = createApp(App)
  // 配置 store
  setupStore(app)
  // 初始化系统配置
  initAppConfigStore()
  // 配置路由
  setupRouter(app)
  // 路由守卫
  setupRouterGuard(router)
  // 注册全局指令
  setupGlobDirectives(app)
  // 配置全局错误处理
  setupErrorHandle(app)

  app.mount('#app')
}

initConfig()

import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
//  持久化缓存
store.use(piniaPluginPersist)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }

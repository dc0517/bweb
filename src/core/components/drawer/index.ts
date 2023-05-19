import { withInstall } from '@/utils'
import basicDrawer from './src/basic-drawer.vue'

export * from './src/typing'
export { useDrawer, useDrawerInner } from './src/use-drawer'
export const BasicDrawer = withInstall(basicDrawer)

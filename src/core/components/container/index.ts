import { withInstall } from '@/utils'
import collapseContainer from './components/collapse-container.vue'
import scrollContainer from './children/scroll-container.vue'
import lazyContainer from './children/lazy-container.vue'

export const CollapseContainer = withInstall(collapseContainer)
export const ScrollContainer = withInstall(scrollContainer)
export const LazyContainer = withInstall(lazyContainer)

export * from './types'

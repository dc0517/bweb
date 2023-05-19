import { withInstall } from '@/utils'

import pageFooter from './src/page-footer.vue'
import pageWrapper from './src/page-wrapper.vue'

export const PageFooter = withInstall(pageFooter)
export const PageWrapper = withInstall(pageWrapper)

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight'

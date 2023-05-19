import { withInstall } from '@/utils'
import './src/index.less'
import basicModal from './src/basic-modal.vue'

export * from './src/typing'
export { useModalContext } from './src/hooks/use-modal-context'
export { useModal, useModalInner } from './src/hooks/use-modal'
export const BasicModal = withInstall(basicModal)

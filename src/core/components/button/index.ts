import type { ExtractPropTypes } from 'vue'
import { withInstall } from '@/utils'
import button from './src/basic-button.vue'
import confirmButton from './src/confirm-button.vue'
import { buttonProps } from './src/props'

export const Button = withInstall(button)
export const PopConfirmButton = withInstall(confirmButton)
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>

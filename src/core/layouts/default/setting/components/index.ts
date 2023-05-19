import { createAsyncComponent } from '@/utils/async-component'

export const TypePicker = createAsyncComponent(() => import('./type-picker.vue'))
export const SettingFooter = createAsyncComponent(() => import('./setting-footer.vue'))
export const SwitchItem = createAsyncComponent(() => import('./switch-item.vue'))
export const SelectItem = createAsyncComponent(() => import('./select-item.vue'))
export const InputNumberItem = createAsyncComponent(() => import('./input-number-item.vue'))

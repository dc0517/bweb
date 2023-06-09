import { createAsyncComponent } from '@/utils/async-component'
import FullScreen from './full-screen/index.vue'

export const Dashboard = createAsyncComponent(() => import('./dashboard.vue'))
export const UserDropDown = createAsyncComponent(() => import('./user-dropdown/index.vue'), {
  loading: true
})

export { FullScreen }

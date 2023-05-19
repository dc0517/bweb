import type { Router } from 'vue-router'
import { PageEnum } from '@/constants/enums/page-enum'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
import { useUserStore } from '@s/store/modules/user'

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    if (to.path === PageEnum.BASE_LOGIN) {
      const userStore = useUserStore()
      const appStore = useAppStore()
      const permissionStore = usePermissionStore()
      appStore.resetAllState()
      permissionStore.resetState()
      userStore.resetState()
    }
  })
}

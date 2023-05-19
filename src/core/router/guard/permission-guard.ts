import type { Router, RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/constants/enums/page-enum'
import { usePermissionStoreWithOut } from '@/store/permission'
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { useUserStoreWithOut } from '@s/store/modules/user'

const LOGIN_PATH = PageEnum.BASE_LOGIN // 登录
const whitePathList: PageEnum[] = [LOGIN_PATH] // 路由白名单

// 路由权限
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken
    // 白名单路由
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        // 跳转到指定或默认页
        const isSessionTimeout = userStore.getSessionTimeout
        if (!isSessionTimeout) {
          next((to.query?.redirect as string) || '/')
          return
        }
      }
      next()
      return
    }
    if (!token) {
      // 忽略权限
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      // 跳转登录页
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }
    // 登录后跳转首页
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name && to.fullPath !== PageEnum.BASE_HOME) {
      next(PageEnum.BASE_HOME)
      return
    }
    // 路由是否动态添加
    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    // 构建路由
    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
    permissionStore.setDynamicAddedRoute(true)
    // 是否404页面
    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}

import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import { PageEnum } from '@/constants/enums/page-enum'

const modules: Record<string, any> = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = []

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  // @ts-ignore
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@b/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE]

import type { Router, RouteLocationNormalized } from 'vue-router'
import { unref } from 'vue'
import nProgress from 'nprogress'
import { Modal, notification } from 'ant-design-vue'
import projectSetting from '@/config/project-config'
import { useTransitionConfig } from '@/hooks/config/use-transition-config'
import { setRouteChange } from '@/logics/mitt/route-change'
import { useAppStoreWithOut } from '@/store/app'
import { AxiosCanceler } from '@/utils/axios/cancel'
import { warn } from '@/utils/log'
import { useUserStoreWithOut } from '@s/store/modules/user'
import { createParamMenuGuard } from './param-menu-guard'
import { createPermissionGuard } from './permission-guard'
import { createStateGuard } from './state-guard'

/**
 * 路由守卫
 * @param router 路由
 */
export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router)
  createStateGuard(router)
}

/**
 * 处理页面状态
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path)
    setRouteChange(to)
    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// 处理页面加载状态
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionConfig()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }
    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
}

/**
 * 路由切换时，用于关闭当前页面以完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending()
    return true
  })
}

// 页面切换后回到顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }
  const body = document.body
  router.afterEach(async (to) => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}

/**
 * 路由切换时关闭消息提示
 * @param router
 */
export function createMessageGuard(router: Router) {
  const { closeMessageOnSwitch } = projectSetting

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        Modal.destroyAll()
        notification.destroy()
      }
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

/**
 * 路由切换进度条
 * @param router
 */
export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionConfig()
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    unref(getOpenNProgress) && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}

export const REDIRECT_NAME = 'Redirect'
export const PARENT_LAYOUT_NAME = 'ParentLayout'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
/**
 * 异常页面
 */
export const EXCEPTION_COMPONENT = () => import('@/layouts/exception/index.vue')
/**
 * layout页面
 */
export const LAYOUT = () => import('@/layouts/default/index.vue')
/**
 * main-out页面
 */
export const MAINOUT = () => import('@/layouts/page/main-out.vue')
/**
 * 父级 layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME
      })
    })
}

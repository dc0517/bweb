export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 菜单排序，只对第一级有效
    orderNo?: number
    // 路由title
    title: string
    // 动态路由的实际Path, 即去除路由的动态部分
    realPath?: string
    // 是否忽略权限
    ignoreAuth?: boolean
    // 是否忽略KeepAlive缓存
    ignoreKeepAlive?: boolean
    // 是否固定标签
    affix?: boolean
    // 图标，也是菜单图标
    icon?: string
    // 内嵌iframe的地址
    frameSrc?: string
    // 指定该路由切换的动画名
    transitionName?: string
    // 隐藏该路由在面包屑上面的显示
    hideBreadcrumb?: boolean
    // 隐藏所有子菜单
    hideChildrenInMenu?: boolean
    // 是否携带参数
    carryParam?: boolean
    // 是否单层菜单：用于内部标记单层菜单
    single?: boolean
    // 当前活动菜单
    currentActiveMenu?: string
    // 是否显示菜单
    hideMenu?: boolean
    // 是否外链
    isLink?: boolean
    // 是否忽略路由
    ignoreRoute?: boolean
  }
}

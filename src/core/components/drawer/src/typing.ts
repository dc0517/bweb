import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import type { CSSProperties, VNodeChild, ComputedRef } from 'vue'
import type { ScrollContainerOptions } from '@/components/container/index'

export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void
  emitVisible?: (visible: boolean, uid: number) => void
}

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void
  closeDrawer: () => void
  getVisible?: ComputedRef<boolean>
}

export type RegisterFn = (drawerInstance: DrawerInstance, uuid?: string) => void

export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods]

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface DrawerFooterProps {
  // 显示确认按钮
  showOkBtn: boolean
  // 显示取消按钮
  showCancelBtn: boolean
  // 取消按钮文本
  cancelText: string
  // 确认按钮文本
  okText: string
  // 确认按钮类型
  okType: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default'
  // 确认按钮参数
  okButtonProps: { props: ButtonProps; on: {} }
  // 取消按钮参数
  cancelButtonProps: { props: ButtonProps; on: {} }
  // 点击确认时是否加载Loading
  confirmLoading: boolean
  // 显示底部
  showFooter: boolean
}
export interface DrawerProps extends DrawerFooterProps {
  isDetail?: boolean
  loading?: boolean
  showDetailBack?: boolean
  visible?: boolean
  scrollOptions?: ScrollContainerOptions
  closeFunc?: () => Promise<any>
  triggerWindowResize?: boolean
  // 是否显示右上角关闭按钮
  closable?: boolean
  // 是否在关闭抽屉时卸载子组件
  destroyOnClose?: boolean
  // 指定 Drawer 挂载的 HTML 节点
  getContainer?: () => HTMLElement | string
  // 是否显示遮罩
  mask?: boolean
  // 点击遮罩是否关闭抽屉
  maskClosable?: boolean
  // 遮罩样式
  maskStyle?: CSSProperties
  // 标题
  title?: VNodeChild | JSX.Element
  // drawer 容器类名
  wrapClassName?: string
  // 对话框外层容器的类名
  class?: string
  // 可用于设置 Drawer 包裹内容部分的样式
  wrapStyle?: CSSProperties
  // 用于设置 Drawer 弹出层的样式
  drawerStyle?: CSSProperties
  // 可用于设置 Drawer 内容部分的样式
  bodyStyle?: CSSProperties
  // 用于设置 Drawer 头部的样式
  headerStyle?: CSSProperties
  // 宽度
  width?: string | number
  // 高度, 在 placement 为 top 或 bottom 时使用
  height?: string | number
  // 设置 Drawer 的 z-index 默认：1000
  zIndex?: number
  // 抽屉的方向
  placement?: 'top' | 'right' | 'bottom' | 'left'
  // 切换抽屉时动画结束后的回调
  afterVisibleChange?: (visible?: boolean) => void
  //  是否支持键盘 esc 关闭
  keyboard?: boolean
  // 点击遮罩层或左上角叉或取消按钮的回调
  onClose?: (e?: Event) => void
}

export interface DrawerActionType {
  scrollBottom: () => void
  scrollTo: (to: number) => void
  getScrollWrap: () => Element | null
}

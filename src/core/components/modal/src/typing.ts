import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes'
import type { CSSProperties, VNodeChild, ComputedRef } from 'vue'
/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void
  emitVisible?: (visible: boolean, uid: number) => void
  redoModalHeight?: () => void
}

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void
  closeModal: () => void
  getVisible?: ComputedRef<boolean>
}

export type UseModalReturnType = [RegisterFn, ReturnMethods]

export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void
  changeLoading: (loading: boolean) => void
  changeOkLoading: (loading: boolean) => void
  getVisible?: ComputedRef<boolean>
  redoModalHeight: () => void
}

export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods]

export interface ModalProps {
  // 最小高度
  minHeight?: number
  // 弹窗高度
  height?: number
  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number
  // 是否可拖拽
  draggable?: boolean
  // 滚动到顶部
  scrollTop?: boolean
  // 是否可以进行全屏
  canFullscreen?: boolean
  // 默认全屏
  defaultFullscreen?: boolean
  // 弹窗是否可见
  visible?: boolean
  // 温馨提醒信息
  helpMessage: string | string[]
  // 是否使用弹窗外层容器
  useWrapper: boolean
  // 显示加载动画
  loading: boolean
  // 加载提示
  loadingTip?: string
  // wrapper 配置
  wrapperProps: Omit<ModalWrapperProps, 'loading'>
  // 显示确认按钮
  showOkBtn: boolean
  // 显示取消按钮
  showCancelBtn: boolean
  // 关闭事件
  closeFunc: () => Promise<any>
  // 在modal完全关闭时调用的函数.
  afterClose?: () => any
  // 弹窗 body 样式
  bodyStyle?: CSSProperties
  // 取消按钮文本
  cancelText?: string
  // 是否居中显示
  centered?: boolean
  // 是否显示右上角关闭icon
  closable?: boolean
  // 自定义关闭图标
  closeIcon?: VNodeChild | JSX.Element
  // 确定按钮 loading
  confirmLoading?: boolean
  // 关闭时销毁 Modal 里的子元素
  destroyOnClose?: boolean
  // 底部内容，当不需要默认底部按钮时，可以设为 :footer="null"
  footer?: VNodeChild | JSX.Element
  // 指定 Modal 挂载的 HTML 节点
  getContainer?: (instance: any) => HTMLElement
  // 是否展示遮罩
  mask?: boolean
  // 点击蒙层是否允许关闭
  maskClosable?: boolean
  // 遮罩样式
  maskStyle?: CSSProperties
  // 确认按钮文本
  okText?: string
  // 确认按钮类型
  okType?: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default'
  // 确认按钮 props
  okButtonProps?: ButtonProps
  // 取消按钮 props
  cancelButtonProps?: ButtonProps
  // 标题
  title?: VNodeChild | JSX.Element
  // 宽度
  width?: string | number
  // 对话框外层容器的类名
  wrapClassName?: string
  // 设置 Modal 的 z-index
  zIndex?: number
}

export interface ModalWrapperProps {
  footerOffset?: number
  loading: boolean
  modalHeaderHeight: number
  modalFooterHeight: number
  minHeight: number
  height: number
  visible: boolean
  fullScreen: boolean
  useWrapper: boolean
}

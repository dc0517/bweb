import type { PropType, CSSProperties } from 'vue'
import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import type { ModalWrapperProps } from './typing'

export const modalProps = {
  // 是否可见
  visible: { type: Boolean },
  // 滚动到顶部
  scrollTop: { type: Boolean, default: true },
  // 高
  height: { type: Number },
  // 最小高
  minHeight: { type: Number },
  // 是否可拖拽
  draggable: { type: Boolean, default: true },
  // 默认显示位置
  centered: { type: Boolean },
  // 取消按钮文本
  cancelText: { type: String, default: '取消' },
  // 确认按钮文本
  okText: { type: String, default: '确认' },
  // 关闭后触发事件
  closeFunc: Function as PropType<() => Promise<boolean>>
}

export const basicProps = Object.assign({}, modalProps, {
  // 默认全屏
  defaultFullscreen: { type: Boolean },
  // 是否开启全屏
  canFullscreen: { type: Boolean, default: true },
  // 启用弹窗外层容器后，底部高度
  wrapperFooterOffset: { type: Number, default: 0 },
  // 温馨提示
  helpMessage: [String, Array] as PropType<string | string[]>,
  // 是否设置 wrapper
  useWrapper: { type: Boolean, default: true },
  // 加载动画
  loading: { type: Boolean },
  // 加载提示
  loadingTip: { type: String },
  // 显示取消按钮
  showCancelBtn: { type: Boolean, default: true },
  // 显示确认按钮
  showOkBtn: { type: Boolean, default: true },
  // 弹窗外层容器属性
  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,
  // 关闭后事件
  afterClose: Function as PropType<() => Promise<VueNode>>,
  // 弹窗 body 样式
  bodyStyle: Object as PropType<CSSProperties>,
  // 是否显示右上角的关闭按钮
  closable: { type: Boolean, default: true },
  // 自定义关闭图标
  closeIcon: Object as PropType<VueNode>,
  // 确定按钮 loading
  confirmLoading: { type: Boolean },
  // 关闭时销毁 Modal 里的子元素
  destroyOnClose: { type: Boolean },
  // 底部内容，当不需要默认底部按钮时，可以设为 :footer="null"
  footer: Object as PropType<VueNode>,
  // 指定 Modal 挂载的 HTML 节点
  getContainer: Function as PropType<() => any>,
  // 是否展示遮罩
  mask: { type: Boolean, default: true },
  // 点击蒙层是否允许关闭
  maskClosable: { type: Boolean, default: true },
  // 是否支持键盘 esc 关闭
  keyboard: { type: Boolean, default: true },
  // 遮罩样式
  maskStyle: Object as PropType<CSSProperties>,
  // 确认按钮类型
  okType: { type: String, default: 'primary' },
  // 确认按钮 props
  okButtonProps: Object as PropType<ButtonProps>,
  // 取消按钮 props
  cancelButtonProps: Object as PropType<ButtonProps>,
  // 标题
  title: { type: String },
  // 弹窗是否可见
  visible: { type: Boolean },
  // 宽度
  width: [String, Number] as PropType<string | number>,
  // 对话框外层容器的类名
  wrapClassName: { type: String },
  // 设置 Modal 的 z-index
  zIndex: { type: Number }
})

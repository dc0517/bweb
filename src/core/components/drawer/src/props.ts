import type { PropType } from 'vue'

export const footerProps = {
  // 确认提示loading
  confirmLoading: { type: Boolean },
  // 显示取消按钮
  showCancelBtn: { type: Boolean, default: true },
  // 取消按钮参数
  cancelButtonProps: Object as PropType<Recordable>,
  // 取消按钮文本
  cancelText: { type: String, default: '取消' },
  // 显示确认按钮
  showOkBtn: { type: Boolean, default: true },
  // 确认按钮参数
  okButtonProps: Object as PropType<Recordable>,
  // 确认按钮文本
  okText: { type: String, default: '确认' },
  // 确认按钮类型
  okType: { type: String, default: 'primary' },
  // 显示底部内容
  showFooter: { type: Boolean }
}

export const basicProps = {
  // 是否详情
  isDetail: { type: Boolean },
  // 标题
  title: { type: String, default: '' },
  // 加载文本
  loadingText: { type: String },
  // 显示详情返回icon
  showDetailBack: { type: Boolean, default: true },
  // 是否显示
  visible: { type: Boolean },
  // 是否加载中
  loading: { type: Boolean },
  // 点击遮罩是否关闭抽屉
  maskClosable: { type: Boolean, default: true },
  // drawer挂载节点
  getContainer: {
    type: [Object, String] as PropType<any>
  },
  closeFunc: {
    type: [Function, Object] as PropType<any>,
    default: null
  },
  destroyOnClose: { type: Boolean },
  ...footerProps
}

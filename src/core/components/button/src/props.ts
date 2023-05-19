import { propTypes } from '@/utils/prop-types'

const validColors = ['error', 'warning', 'success', ''] as const
type ButtonColorType = (typeof validColors)[number]

export const buttonProps = {
  // 按钮颜色
  color: {
    type: String as PropType<ButtonColorType>,
    validator: (str) => validColors.includes(str),
    default: ''
  },
  // 是否加载中
  loading: { type: Boolean },
  // 是否禁用
  disabled: { type: Boolean },
  // 文本前置icon
  preIcon: { type: String },
  // 文本后置icon
  postIcon: { type: String },
  // icon 大小
  iconSize: { type: Number, default: 14 },
  // 按钮大小
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  onClick: { type: Function as PropType<(...args) => any>, default: null }
}

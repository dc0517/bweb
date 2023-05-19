import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface'
import type { CSSProperties, VNode } from 'vue'
import type { RowProps } from 'ant-design-vue/lib/grid/Row'
import type { ButtonProps as AntdButtonProps } from '@/components/button'
import type { TableActionType } from '@/components/table/src/types/table'
import type { FormItem } from './form-item'
import type { ColEx, ComponentType } from './index'

export type FieldMapToTime = [string, [string, string], (string | [string, string])?][]

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur']
}

export interface RenderCallbackParams {
  schema: FormSchema
  values: Recordable
  model: Recordable
  field: string
}

export interface ButtonProps extends AntdButtonProps {
  text?: string
}

export interface FormActionType {
  submit: () => Promise<void>
  setFieldsValue: <T>(values: T) => Promise<void>
  resetFields: () => Promise<void>
  getFieldsValue: () => Recordable
  clearValidate: (name?: string | string[]) => Promise<void>
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  removeSchemaByField: (field: string | string[]) => Promise<void>
  appendSchemaByField: (schema: FormSchema | FormSchema[], prefixField: string | undefined, first?: boolean | undefined) => Promise<void>
  validateFields: (nameList?: NamePath[]) => Promise<any>
  validate: (nameList?: NamePath[]) => Promise<any>
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>
}

export type RegisterFn = (formInstance: FormActionType) => void

export type UseFormReturnType = [RegisterFn, FormActionType]

export interface FormProps {
  name?: string
  // 布局方式
  layout?: 'vertical' | 'inline' | 'horizontal'
  // Form value
  model?: Recordable
  // label宽
  labelWidth?: number | string
  // label对齐方式
  labelAlign?: 'left' | 'right'
  // 表单的行配置
  rowProps?: RowProps
  // 重置后提交表单
  submitOnReset?: boolean
  // 表格更新时提交
  submitOnChange?: boolean
  // 标签布局
  labelCol?: Partial<ColEx>
  // 输入控件布局
  wrapperCol?: Partial<ColEx>
  // 基础行样式
  baseRowStyle?: CSSProperties
  // 通用col配置
  baseColProps?: Partial<ColEx>
  // 表单配置
  schemas?: FormSchema[]
  // 用于合并到动态控件表单项的函数值
  mergeDynamicData?: Recordable
  // 搜索表单是否为紧凑模式
  compact?: boolean
  // 空行跨度
  emptySpan?: number | Partial<ColEx>
  // 组件大小
  size?: 'default' | 'small' | 'large'
  // 是否禁用
  disabled?: boolean
  // 时间间隔字段被映射为多个
  fieldMapToTime?: FieldMapToTime
  // 自动设置占位符
  autoSetPlaceHolder?: boolean
  // 回车键触发提交
  autoSubmitOnEnter?: boolean
  // 检查标签上是否添加校验信息
  rulesMessageJoinLabel?: boolean
  // 是否显示折叠和展开按钮
  showAdvancedButton?: boolean
  // 是否focus第一个输入框
  autoFocusFirstItem?: boolean
  // 在指定的行数上自动折叠
  autoAdvancedLine?: number
  // 显示行数
  alwaysShowLines?: number
  // 是否显示操作按钮
  showActionButtonGroup?: boolean
  // 重置按钮配置
  resetButtonOptions?: Partial<ButtonProps>
  // 提交按钮配置
  submitButtonOptions?: Partial<ButtonProps>
  // 操作col配置
  actionColOptions?: Partial<ColEx>
  // 显示重置按钮
  showResetButton?: boolean
  // 显示提交按钮
  showSubmitButton?: boolean
  // 与标签一起使用时，是否显示:在标签文字后
  colon?: boolean

  resetFunc?: () => Promise<void>
  submitFunc?: () => Promise<void>
  transformDateFunc?: (date: any) => string
}

// form item properties
export interface FormSchema {
  // 字段名称
  field: string
  // 由内部值更改触发的事件名称 default change
  changeEvent?: string
  // v-model Default value
  valueField?: string
  // Label 名称
  label: string | VNode
  // 二级 label
  subLabel?: string
  // 帮助信息
  helpMessage?: string | string[] | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  // 帮助组件 props
  helpComponentProps?: Partial<HelpComponentProps>
  // Label 宽
  labelWidth?: string | number
  // 禁用表单全局设置的labelWidth，手动设置labelCol和wrapperCol
  disabledLabelWidth?: boolean
  // 组件渲染
  component: ComponentType
  // 组件参数
  componentProps?:
    | ((opt: { schema: FormSchema; tableAction: TableActionType; formActionType: FormActionType; formModel: Recordable }) => Recordable)
    | object
  // 是否必填
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // 后缀
  suffix?: string | number | ((values: RenderCallbackParams) => string | number)
  // 校验规则
  rules?: Rule[]
  // 检查标签上是否添加校验信息
  rulesMessageJoinLabel?: boolean
  // 表单项 props
  itemProps?: Partial<FormItem>
  // col 配置
  colProps?: Partial<ColEx>
  // 默认值
  defaultValue?: any
  // 是否自动处理与时间相关组件的默认值
  isHandleDateDefaultValue?: boolean
  // 是否展开
  isAdvanced?: boolean
  // 匹配详细信息组件
  span?: number
  // 是否显示
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // 是否显示
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // 渲染form-item中内容
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string
  // 渲染form-item外层容器col内容
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string
  // 渲染form-item外层容器组件内容
  renderComponentContent?: ((renderCallbackParams: RenderCallbackParams) => any) | VNode | VNode[] | string
  // from-item插槽
  slot?: string
  // col 插槽
  colSlot?: string
  // 是否禁用(动态)
  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  // 动态校验规则
  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[]
}

export interface HelpComponentProps {
  // 最大宽度
  maxWidth: string
  // 是否显示序列号
  showIndex: boolean
  text: any
  color: string
  fontSize: string
  icon: string
  absolute: boolean
  position: any
}

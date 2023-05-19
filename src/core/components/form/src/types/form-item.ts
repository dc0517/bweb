import type { NamePath } from 'ant-design-vue/lib/form/interface'
import type { ColProps } from 'ant-design-vue/lib/grid/Col'
import type { HTMLAttributes, VNodeChild } from 'vue'

export interface FormItem {
  /**
   * 与标签一起使用时，是否显示:在标签文字后
   * @default true
   * @type boolean
   */
  colon?: boolean
  /**
   * 额外的提示信息。这类似于帮助。使用示例:同时显示错误信息和提示信息
   * @type any (string | slot)
   */
  extra?: string | VNodeChild | JSX.Element
  /**
   * 与validateStatus一起使用时，此选项指定验证状态图标。建议仅与Input一起使用
   * @default false
   * @type boolean
   */
  hasFeedback?: boolean
  /**
   * 提示消息 如果没有提供，则验证规则将生成提示消息.
   * @type any (string | slot)
   */
  help?: string | VNodeChild | JSX.Element
  /**
   * Label
   * @type any (string | slot)
   */
  label?: string | VNodeChild | JSX.Element
  /**
   * 标签的布局 可以将span offset设置为{span: 3, offset: 12}或sm: {span: 3, offset: 12}，与<Col>相同
   * @type Col
   */
  labelCol?: ColProps & HTMLAttributes
  /**
   * 是否必填
   * @default false
   * @type boolean
   */
  required?: boolean
  /**
   * 验证状态
   * @type string
   */
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating'
  /**
   * 输入控件的布局，与labelCol相同
   * @type Col
   */
  wrapperCol?: ColProps
  /**
   * 设置子标签htmlFor
   */
  htmlFor?: string
  /**
   * label对齐方式
   */
  labelAlign?: 'left' | 'right'
  /**
   * validate和resetFields方法的设置中，该属性是必需的
   */
  name?: NamePath
  /**
   * 校验规则
   */
  rules?: object | object[]
  /**
   * 是否自动关联表单字段.
   */
  autoLink?: boolean
  /**
   * 是否在该字段的第一条错误规则上停止验证.
   */
  validateFirst?: boolean
  /**
   * 何时验证子节点的值
   */
  validateTrigger?: string | string[] | false
}

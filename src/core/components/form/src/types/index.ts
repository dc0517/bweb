type ColSpanType = number | string

export interface ColEx {
  style?: any
  /**
   * 栅格占据的单元格数，0对应显示:无
   * @default none (0)
   * @type ColSpanType
   */
  span?: ColSpanType
  /**
   * 栅格顺序，用于伸缩布局模式
   * @default 0
   * @type ColSpanType
   */
  order?: ColSpanType
  /**
   * flex 布局填充
   * @default none
   * @type ColSpanType
   */
  flex?: ColSpanType
  /**
   * 左边偏移col的单元格数
   * @default 0
   * @type ColSpanType
   */
  offset?: ColSpanType
  /**
   * 栅格向右移动的单元格数
   * @default 0
   * @type ColSpanType
   */
  push?: ColSpanType
  /**
   * 栅格向左移动的单元格数
   * @default 0
   * @type ColSpanType
   */
  pull?: ColSpanType
  /**
   * <576px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xs?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
  /**
   * ≥576px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  sm?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
  /**
   * ≥768px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  md?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
  /**
   * ≥992px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  lg?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
  /**
   * ≥1200px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
  /**
   * ≥1600px
   * @type { span: ColSpanType, offset: ColSpanType } | ColSpanType
   */
  xxl?: { span: ColSpanType; offset: ColSpanType } | ColSpanType
}

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ApiTransfer'

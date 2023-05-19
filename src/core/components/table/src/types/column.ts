import { VNodeChild } from 'vue'

export interface ColumnFilterItem {
  text?: string
  value?: string
  children?: any
}

export declare type SortOrder = 'ascend' | 'descend'

export interface RecordProps<T> {
  text: any
  record: T
  index: number
}

export interface FilterDropdownProps {
  prefixCls?: string
  setSelectedKeys?: (selectedKeys: string[]) => void
  selectedKeys?: string[]
  confirm?: () => void
  clearFilters?: () => void
  filters?: ColumnFilterItem[]
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  visible?: boolean
}

export declare type CustomRenderFunction<T> = (record: RecordProps<T>) => VNodeChild | JSX.Element

export interface ColumnProps<T> {
  /**
   * 内容对齐方式
   * @default 'left'
   * @type string
   */
  align?: 'left' | 'right' | 'center'
  /**
   * ellipsis单元格内容
   * @default false
   * @type boolean
   */
  ellipsis?: boolean
  /**
   * 列标题span
   * @type number
   */
  colSpan?: number
  /**
   * 显示字段，支持a.b.c
   * @type string
   */
  dataIndex?: string
  /**
   * 默认过滤值
   * @type string[]
   */
  defaultFilteredValue?: string[]
  /**
   * 默认值排序顺序:'ascend' ' descent ' null
   * @type string
   */
  defaultSortOrder?: SortOrder
  /**
   * Customized filter overlay
   * @type any (slot)
   */
  filterDropdown?: VNodeChild | JSX.Element | ((props: FilterDropdownProps) => VNodeChild | JSX.Element)
  /**
   * 过滤下拉是否可见
   * @type boolean
   */
  filterDropdownVisible?: boolean
  /**
   * 是否支持过滤
   * @default false
   * @type boolean
   */
  filtered?: boolean
  /**
   * 过滤值
   * @type string[]
   */
  filteredValue?: string[]
  /**
   * 过滤Icon
   * @default false
   * @type any
   */
  filterIcon?: boolean | VNodeChild | JSX.Element
  /**
   * 是否支持多选过滤
   * @default true
   * @type boolean
   */
  filterMultiple?: boolean
  /**
   * 过滤项配置
   * @type object[]
   */
  filters?: ColumnFilterItem[]
  /**
   * 列固定方式
   * @default false
   * @type boolean | string
   */
  fixed?: boolean | 'left' | 'right'
  /**
   * 列唯一键
   * @type string
   */
  key?: string
  /**
   * table单元格的渲染器。返回值应该是一个VNode，或者colSpan/rowSpan配置的对象
   * @type Function | ScopedSlot
   */
  customRender?: CustomRenderFunction<T> | VNodeChild | JSX.Element
  /**
   * 列排序的排序函数
   * @type boolean | Function
   */
  sorter?: boolean | Function
  /**
   * 排序顺序:'ascend' ' descent '
   * @type boolean | string
   */
  sortOrder?: boolean | SortOrder
  /**
   * 支持的排序方式：'ascend', 'descend'
   * @default ['ascend', 'descend']
   * @type string[]
   */
  sortDirections?: SortOrder[]
  /**
   * 列标题
   * @type any (string | slot)
   */
  title?: VNodeChild | JSX.Element
  /**
   * 列宽
   * @type string | number
   */
  width?: string | number
  /**
   * 自定义body cell
   * @type Function
   */
  customCell?: (record: T, rowIndex: number) => object
  /**
   * 自定义header cell
   * @type object
   */
  customHeaderCell?: (column: ColumnProps<T>) => object
  /**
   * 单击确认筛选按钮时执行的回调
   * @type Function
   */
  onFilter?: (value: any, record: T) => boolean
  /**
   * 当filter dropdown Visible被改变时执行的回调
   * @type Function
   */
  onFilterDropdownVisibleChange?: (visible: boolean) => void
  /**
   * 使用列时，可以设置此属性来配置插槽
   * such as slots: { filterIcon: 'XXX'}
   * @type object
   */
  slots?: Recordable<string>
}

import type { PropType } from 'vue'
import type { FormProps } from '@/components/form'
import type { PaginationProps } from './types/pagination'
import type { BasicColumn, FetchSetting, TableSetting, SorterResult, TableCustomRecord, TableRowSelection, SizeType } from './types/table'
import { propTypes } from '@/utils/prop-types'
import { DEFAULT_FILTER_FN, DEFAULT_SORT_FN, FETCH_SETTING, DEFAULT_SIZE } from './const'

export const basicProps = {
  // 是否允许点击行选中
  clickToRowSelect: { type: Boolean, default: true },
  // 是否table树
  isTreeTable: Boolean,
  // table 设置按钮
  tableSetting: propTypes.shape<TableSetting>({}),
  // 取消行内填充/边距
  inset: Boolean,
  // 排序方法
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: DEFAULT_SORT_FN
  },
  // 筛选方法
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN
  },
  // 是否显示table 设置按钮
  showTableSetting: Boolean,
  // 是否自动创建key
  autoCreateKey: { type: Boolean, default: true },
  // 斑马效果
  striped: { type: Boolean, default: false },
  // 是否显示合计栏
  showSummary: Boolean,
  // 合计数据回调函数
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null
  },
  // 合计数据
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  // 展示树形数据时，每层缩进的宽度，以 px 为单位
  indentSize: propTypes.number.def(24),
  // 列是否允许拖拽
  canColDrag: { type: Boolean, default: true },
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null
  },
  // 请求前回调
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 请求后回调
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 搜索方法
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null
  },
  // 请求设置
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return FETCH_SETTING
    }
  },
  // 立即请求接口
  immediate: { type: Boolean, default: true },
  // 空数据时是否显示table
  emptyDataIsShowTable: { type: Boolean, default: true },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 默认的排序参数
  defSort: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 使用搜索表单
  useSearchForm: propTypes.bool,
  // 表单配置
  formConfig: {
    type: Object as PropType<Partial<FormProps>>,
    default: null
  },
  // table 列
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => []
  },
  // 是否显示序号列
  showIndexColumn: { type: Boolean, default: false },
  // 序号列 props
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null
  },
  // table 操作列
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null
  },
  // 超过宽度将自动省略
  ellipsis: { type: Boolean, default: true },
  // 是否继承父级高度（父级高度-表单高度-padding高度）
  isCanResizeParent: { type: Boolean, default: false },
  // 高度是否自适应
  canResize: { type: Boolean, default: true },
  // 切换分页时清空选项
  clearSelectOnPageChange: propTypes.bool,
  // 自适应高度偏移 计算结果-偏移量
  resizeHeightOffset: propTypes.number.def(0),
  // 选中行配置
  rowSelection: {
    type: Object as PropType<TableRowSelection | null>,
    default: null
  },
  // 标题
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null
  },
  // 标题-帮助信息
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>
  },
  // 最大高度
  maxHeight: propTypes.number,
  // 数据源
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  // 行 key
  rowKey: {
    type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
    default: ''
  },
  // 是否显示边框
  bordered: { type: Boolean, default: false },
  // 是否分页
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: null
  },
  // 是否加载中
  loading: propTypes.bool,
  // row class name
  rowClassName: {
    type: Function as PropType<(record: TableCustomRecord<any>, index: number) => string>
  },
  // 滚动条配置
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null
  },
  // 编辑提交前回调
  beforeEditSubmit: {
    type: Function as PropType<(data: { record: Recordable; index: number; key: string | number; value: any }) => Promise<any>>
  },
  // table size
  size: {
    type: String as PropType<SizeType>,
    default: DEFAULT_SIZE
  }
}

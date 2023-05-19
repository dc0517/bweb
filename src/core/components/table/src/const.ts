import componentSetting from '@/config/component-config'

const { table } = componentSetting

const { pageSizeOptions, defaultPageSize, fetchSetting, defaultSize, hideOnSinglePage, defaultSortFn, defaultFilterFn } = table

export const ROW_KEY = 'key'
// page size 选项
export const PAGE_SIZE_OPTIONS = pageSizeOptions
// page szie
export const PAGE_SIZE = defaultPageSize
// 常用接口字段设置
export const FETCH_SETTING = fetchSetting
// 默认页码
export const DEFAULT_SIZE = defaultSize
// 单页时隐藏分页
export const HIDE_SINGLE_PAGE = hideOnSinglePage
// 内容显示位置
export const DEFAULT_ALIGN = 'center'
export const INDEX_COLUMN_FLAG = 'INDEX'
export const ACTION_COLUMN_FLAG = 'ACTION'
// 默认排序函数
export const DEFAULT_SORT_FN = defaultSortFn
// 默认过滤函数
export const DEFAULT_FILTER_FN = defaultFilterFn

import type { ColumnProps } from 'ant-design-vue/lib/table'

type SortOrder = 'ascend' | 'descend'

interface SorterResult {
  column: ColumnProps
  order: SortOrder
  field: string
  columnKey: string
}

export default {
  // table 配置
  table: {
    fetchSetting: {
      // 当前页数
      pageField: 'page',
      // 页显示数量字段
      sizeField: 'pageSize',
      // 列表字段  支持 a.b.c
      listField: 'items',
      // 结果总数字段  支持 a.b.c
      totalField: 'total'
    },
    // 只有一页时是否隐藏分页器
    hideOnSinglePage: true,
    // pageSize选项
    pageSizeOptions: ['10', '15', '20', '50'],
    // 默认页显示数量
    defaultPageSize: 10,
    // 默认尺寸大小
    defaultSize: 'middle',
    // 自定义排序
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo
      if (field && order) {
        return {
          field,
          order
        }
      } else {
        return {}
      }
    },
    // 自定义过滤
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data
    }
  }
}

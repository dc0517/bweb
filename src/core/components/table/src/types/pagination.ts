import Pagination from 'ant-design-vue/es/pagination'
import { VNodeChild } from 'vue'

interface PaginationRenderProps {
  page: number
  type: 'page' | 'prev' | 'next'
  originalElement: any
}

type PaginationPositon = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'

export declare class PaginationConfig extends Pagination {
  position?: PaginationPositon[]
}

export interface PaginationProps {
  /**
   * 总数
   * @default 0
   * @type number
   */
  total?: number
  /**
   * 默认初始页码
   * @default 1
   * @type number
   */
  defaultCurrent?: number
  /**
   * 当前页码
   * @type number
   */
  current?: number
  /**
   * 每页的默认数据
   * @default 10
   * @type number
   */
  defaultPageSize?: number
  /**
   * 每页显示数据
   * @type number
   */
  pageSize?: number
  /**
   * 是否在单页上隐藏分页
   * @default false
   * @type boolean
   */
  hideOnSinglePage?: boolean
  /**
   * pageSize是否可以更改
   * @default false
   * @type boolean
   */
  showSizeChanger?: boolean
  /**
   * pageSize选项
   * @default ['10', '20', '30', '40']
   * @type string[]
   */
  pageSizeOptions?: string[]
  /**
   * 是否支持跳转
   * @default false
   * @type boolean
   */
  showQuickJumper?: boolean | object
  /**
   * 显示总数和范围
   * @type Function
   */
  showTotal?: (total: number, range: [number, number]) => any
  /**
   * large / small
   * @default ''
   * @type string
   */
  size?: string
  /**
   * 是否设置简单模式
   * @type boolean
   */
  simple?: boolean
  /**
   * 自定义项
   * @type Function
   */
  itemRender?: (props: PaginationRenderProps) => VNodeChild | JSX.Element
  /**
   * 指定分页的位置
   * @default ['bottomRight']
   * @type string[]
   */
  position?: PaginationPositon[]
}

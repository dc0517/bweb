export interface BasicFetchResult<T> {
  items: T[]
  total: number
}

export interface BasicPageParams {
  pageNum: number
  pageSize: number
}

export interface BasicDeleteParams {
  id: string
}

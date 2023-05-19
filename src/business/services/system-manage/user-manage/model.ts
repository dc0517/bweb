export interface LoginParams {
  name: string
  password: string
}

export interface LoginResultModel {
  userId: string | number
  token: string
  menus?: Array<any>
}

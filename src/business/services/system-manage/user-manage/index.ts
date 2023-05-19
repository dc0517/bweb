import { http } from '@/utils/axios'
import { LoginParams, LoginResultModel } from './model'
import { SystemManage } from '../interface'

export function loginIn(data: LoginParams) {
  return http.post<LoginResultModel>({
    url: SystemManage.LoginIn,
    data
  })
}

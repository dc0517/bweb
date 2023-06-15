import { BasicPageParams, BasicFetchResult, BasicDeleteParams } from '@b/services/common/model'

export interface RoleSearchModel {
  name?: string
  roleType?: string
}

export interface RoleInfoModel {
  id: string
  code: string // 角色编号
  name: string // 角色名称
  type: string // 角色类型
  description: string // 描述
}

// 筛选角色列表
export type RolePageParams = BasicPageParams & RoleSearchModel
// 删除指定角色
export type RoleDeleteParams = BasicDeleteParams
// 角色列表
export type RoleResultModel = BasicFetchResult<RoleInfoModel>

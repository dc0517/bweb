import { http } from '@/utils/axios'
import { RoleDeleteParams, RolePageParams, RoleInfoModel, RoleResultModel } from './model'
import { SystemManage } from '../interface'

/**
 * @description: 获取角色列表
 */
export function getRoleList(params: RolePageParams) {
  return http.get<RoleResultModel>({ url: SystemManage.RoleList, params })
}

/**
 * @description: 添加/编辑 角色
 */
export function updateRole(data: RoleInfoModel) {
  return http.post({ url: SystemManage.RoleUpdate, data })
}

/**
 * @description: 删除指定角色
 */
export function deleteRoleById(params: RoleDeleteParams) {
  return http.delete({ url: SystemManage.RoleDelete, params })
}

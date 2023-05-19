/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: DongChen 2634403005@qq.com
 * @LastEditTime: 2023-05-15 11:29:10
 * @FilePath: \basic-web-beat\src\core\router\routes\modules\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/constants/constants/route'

const systemManage: AppRouteModule = {
  path: '/system-manage',
  name: 'SystemManage',
  component: LAYOUT,
  redirect: '/system-manage/user-manage',
  meta: {
    title: '系统管理',
    orderNo: 2
  },
  children: [
    {
      path: 'user-manage',
      name: 'UserManage',
      meta: {
        title: '用户管理'
      },
      component: () => import('@b/views/system-manage/user-manage/index.vue')
    },
    {
      path: 'role-manage',
      name: 'RoleManage',
      component: () => import('@b/views/system-manage/role-manage/index.vue'),
      meta: {
        title: '角色管理'
      }
    }
  ]
}

export default systemManage

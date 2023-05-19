/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: lhl
 * @LastEditTime: 2023-05-17 17:37:37
 * @FilePath: \basic-web-beat\src\core\router\routes\modules\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/constants/constants/route'

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    title: '首页',
    orderNo: 1
  },
  children: [
    {
      path: 'index',
      name: '首页',
      component: () => import('@b/views/home/index.vue'),
      meta: {
        title: '首页',
        hideMenu: true
      }
    },
    {
      path: 'index2',
      name: '首页2',
      component: () => import('@b/views/home/index.vue'),
      meta: {
        title: '首页2',
        hideMenu: true
      }
    }
  ]
}

export default home

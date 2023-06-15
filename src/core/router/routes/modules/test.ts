/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: lhl
 * @LastEditTime: 2023-06-15 17:11:48
 * @FilePath: \basic-web-beat\src\core\router\routes\modules\home.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppRouteModule } from '@/router/types'
import { MAINOUT } from '@/constants/constants/route'

const home: AppRouteModule = {
  path: '/test-main-out',
  name: 'TestMainOut',
  component: MAINOUT,
  redirect: '/test-main-out/index',
  meta: {
    hideChildrenInMenu: true,
    title: '无母版页',
    orderNo: 3
  },
  children: [
    {
      path: 'index',
      name: 'MainOutIndex',
      component: () => import('@b/views/test/main-out.vue'),
      meta: {
        title: '无母版页',
        hideMenu: true
      }
    }
  ]
}

export default home

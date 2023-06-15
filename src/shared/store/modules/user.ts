import { h } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { PageEnum } from '@/constants/enums/page-enum'
import { useMessage } from '@/hooks/web/use-message'
import { store } from '@s/store'
import { useAppStore } from '@/store/app'
import { loginIn } from '@b/services/system-manage/user-manage'
import { LoginParams } from '@b/services/system-manage/user-manage/model'

interface UserInfo {
  userId?: string | number
  userName?: string
  realName?: string
  menus?: Array<any>
}

interface UserState {
  token?: string
  userInfo: UserInfo
  sessionTimeout?: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: {},
    sessionTimeout: false
  }),
  getters: {
    getToken(state): string {
      return state.token || ''
    },
    getUserInfo(state): UserInfo {
      return state.userInfo || {}
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout
    }
  },
  actions: {
    setToken(data: string | undefined) {
      this.token = data ? data : ''
    },
    setUserInfo(data?: UserInfo) {
      this.userInfo = data ? data : {}
    },
    setSessionTimeout(data: boolean) {
      this.sessionTimeout = data
    },
    async afterLoginAction(data?: UserInfo): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userData = data ?? {}
      const userInfo = await this.getUserInfoAction(userData)
      return userInfo
    },
    async getUserInfoAction(data: UserInfo): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const { menus = [] } = data
      this.setUserInfo(data)
      // 菜单转化
      if (menus?.length) {
      }
      // 是否显示模块页
      const getShowModulePage = useAppStore().getProjectConfig.modulePage
      if (getShowModulePage) await router.replace(PageEnum.BASE_MODULE)
      else await router.replace(PageEnum.BASE_HOME)

      return data
    },
    async loginIn(params: LoginParams): Promise<UserInfo | null> {
      try {
        const { ...loginParams } = params
        const data = await loginIn(loginParams)
        const { token } = data
        this.setToken(token)
        return this.afterLoginAction(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async logout() {
      this.setToken(undefined)
      this.setUserInfo(undefined)
      router.push(PageEnum.BASE_LOGIN)
    },
    /**
     * @description: 退出登录前确认
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '温馨提醒'),
        content: () => h('span', '是否确认退出系统?'),
        onOk: async () => {
          await this.logout()
        }
      })
    },
    resetState() {
      this.userInfo = {}
      this.token = ''
    }
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 存储方式和内容
    strategies: [{ storage: localStorage, paths: ['token', 'userInfo'] }]
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}

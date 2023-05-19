import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '../utils'

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: '管理员',
      desc: '管理员',
      password: '123456',
      token: 'admin&token',
      menus: []
    }
  ]
}

export default [
  {
    url: '/basic-api/loginIn',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { name, password } = body
      const checkUser = createFakeUserList().find((item) => item.username === name && password === item.password)
      if (!checkUser) {
        return resultError('账号或密码错误')
      }
      const { userId, username: _username, token, realName, desc } = checkUser
      return resultSuccess({
        userId,
        username: _username,
        token,
        realName,
        desc
      })
    }
  }
] as MockMethod[]

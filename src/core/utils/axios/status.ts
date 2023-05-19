import { useMessage } from '@/hooks/web/use-message'
import ProjectConfig from '@/config/project-config'
import { SessionTimeoutProcessingEnum } from '@/constants/enums/app-enum'
import { useUserStoreWithOut } from '@s/store/modules/user'

const { createMessage } = useMessage()
const error = createMessage.error!
const stp = ProjectConfig.sessionTimeoutProcessing

export function checkStatus(status: number, msg: string): void {
  const userStore = useUserStoreWithOut()
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      userStore.setToken(undefined)
      errMessage = msg || '暂无访问权限'
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true)
      } else {
        userStore.logout()
      }
      break
    default:
  }
  if (errMessage) {
    error({ content: errMessage, key: `global_error_message_status_${status}` })
  }
}

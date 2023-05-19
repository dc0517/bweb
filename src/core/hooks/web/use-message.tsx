/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: DongChen 2634403005@qq.com
 * @LastEditTime: 2023-05-12 10:39:49
 * @FilePath: \basic-web-beat\src\core\hooks\web\use-message.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'
import { Modal, message as Message, notification } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification'
import { isString } from '@/utils/is'

export interface NotifyApi {
  info(config: NotificationArgsProps): void
  success(config: NotificationArgsProps): void
  error(config: NotificationArgsProps): void
  warn(config: NotificationArgsProps): void
  warning(config: NotificationArgsProps): void
  open(args: NotificationArgsProps): void
  close(key: String): void
  config(options: ConfigProps): void
  destroy(): void
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
export declare type IconType = 'success' | 'info' | 'error' | 'warning'
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info'
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

interface ConfirmOptions {
  info: ModalFunc
  success: ModalFunc
  error: ModalFunc
  warn: ModalFunc
  warning: ModalFunc
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info" />
  } else {
    return <CloseCircleFilled class="modal-icon-error" />
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>
  } else {
    return content
  }
}

/**
 * confirm弹窗
 */
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options)
  }
  return Modal.confirm(opt) as unknown as ConfirmOptions
}
// 操作按钮
const getBaseOptions = () => {
  return {
    okText: '确认',
    centered: true
  }
}
// modal弹窗
function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon)
  }
}
// success modal弹窗
function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'))
}
// error modal弹窗
function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'error'))
}
// info modal弹窗
function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'))
}
// warning modal弹窗
function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'))
}
// notification显示位置
notification.config({
  placement: 'topRight',
  duration: 3
})

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    notification: notification as NotifyApi,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  }
}

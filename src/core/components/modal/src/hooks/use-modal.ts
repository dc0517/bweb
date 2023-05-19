import type { UseModalReturnType, ModalMethods, ModalProps, ReturnMethods, UseModalInnerReturnType } from '../typing'
import { computed, ref, onUnmounted, unref, getCurrentInstance, reactive, watchEffect, nextTick, toRaw } from 'vue'
import { isEqual } from 'lodash-es'
import { isProdMode } from '@/utils/env'
import { isFunction } from '@/utils/is'
import { error } from '@/utils/log'
import { tryOnUnmounted } from '@vueuse/core'

const dataTransfer = reactive<any>({})
const visibleData = reactive<{ [key: number]: boolean }>({})

export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null)
  const loaded = ref<Nullable<boolean>>(false)
  const uid = ref<string>('')

  /**
   * dom 注册
   * @param modalMethod
   * @param uuid
   * @returns
   */
  function register(modalMethod: ModalMethods, uuid: string) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!')
    }
    uid.value = uuid
    isProdMode() &&
      onUnmounted(() => {
        modal.value = null
        loaded.value = false
        dataTransfer[unref(uid)] = null
      })
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return
    modal.value = modalMethod
    loaded.value = true
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible
    }
  }

  const getInstance = () => {
    const instance = unref(modal)
    if (!instance) {
      error('useModal instance is undefined!')
    }
    return instance
  }

  const methods: ReturnMethods = {
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)]
    }),
    /**
     * 设置modal属性
     * @param props
     */
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props)
    },
    /**
     * 重置Modal高
     */
    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.()
    },
    /**
     * 打开modal弹窗
     * @param visible 是否可见
     * @param data 父子组件传参
     * @param openOnSet
     * @returns
     */
    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      // 设置弹窗可见
      getInstance()?.setModalProps({
        visible: visible
      })
      if (!data) return
      const id = unref(uid)
      if (openOnSet) {
        dataTransfer[id] = null
        dataTransfer[id] = toRaw(data)
        return
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data))
      if (!equal) {
        dataTransfer[id] = toRaw(data)
      }
    },
    closeModal: () => {
      getInstance()?.setModalProps({ visible: false })
    }
  }
  return [register, methods]
}

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null)
  const currentInstance = getCurrentInstance()
  const uidRef = ref<string>('')

  const getInstance = () => {
    const instance = unref(modalInstanceRef)
    if (!instance) {
      error('useModalInner instance is undefined!')
    }
    return instance
  }

  const register = (modalInstance: ModalMethods, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null
      })
    uidRef.value = uuid
    modalInstanceRef.value = modalInstance
    currentInstance?.emit('register', modalInstance, uuid)
  }

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)]
      }),
      /**
       * 弹窗 loading 状态
       * @param loading
       */
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading })
      },
      /**
       * 确认按钮 loading 状态
       * @param loading
       */
      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading })
      },
      /**
       * 关闭弹窗
       */
      closeModal: () => {
        getInstance()?.setModalProps({ visible: false })
      },
      /**
       * 设置弹窗属性
       * @param props
       */
      setModalProps: (props: Partial<ModalProps>) => {
        getInstance()?.setModalProps(props)
      },
      /**
       * 重置弹窗高度
       */
      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight
        callRedo && callRedo()
      }
    }
  ]
}

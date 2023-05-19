import { defineComponent, toRefs, unref } from 'vue'
import { Modal } from 'ant-design-vue'
import { useAttrs } from '@/hooks/core/use-attrs'
import { extendSlots } from '@/utils/tsx-helper'
import { basicProps } from '../props'
import { useModalDragMove } from '../hooks/use-modal-drag'

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props)
    const attrs = useAttrs()

    // 弹窗拖拽 hooks
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable
    })

    const onCancel = (e: Event) => {
      emit('cancel', e)
    }

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>
    }
  }
})

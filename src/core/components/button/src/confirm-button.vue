<script lang="ts">
  import { computed, defineComponent, h, unref } from 'vue'
  import { Popconfirm } from 'ant-design-vue'
  import { omit } from 'lodash-es'
  import { extendSlots } from '@/utils/tsx-helper'
  import { useAttrs } from '@/hooks/core/use-attrs'
  import BasicButton from './basic-button.vue'

  const props = {
    /**
     * 是否启用下拉菜单
     * @default: true
     */
    enable: {
      type: Boolean,
      default: true
    }
  }

  export default defineComponent({
    name: 'PopButton',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const attrs = useAttrs()

      const getBindValues = computed(() => {
        return Object.assign(
          {
            okText: '确认',
            cancelText: '取消'
          },
          { ...props, ...unref(attrs) }
        )
      })

      return () => {
        const bindValues = omit(unref(getBindValues), 'icon')
        const btnBind = omit(bindValues, 'title') as Recordable
        if (btnBind.disabled) btnBind.color = ''
        const Button = h(BasicButton, btnBind, extendSlots(slots))
        if (!props.enable) {
          return Button
        }
        return h(Popconfirm, bindValues, { default: () => Button })
      }
    }
  })
</script>

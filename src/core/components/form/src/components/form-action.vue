<template>
  <a-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore"></slot>
        <Button type="default" class="mr-2" v-bind="getResetBtnOptions" @click="resetAction" v-if="showResetButton">
          {{ getResetBtnOptions.text }}
        </Button>
        <slot name="submitBefore"></slot>

        <Button type="primary" class="mr-2" v-bind="getSubmitBtnOptions" @click="submitAction" v-if="showSubmitButton">
          {{ getSubmitBtnOptions.text }}
        </Button>

        <slot name="advanceBefore"></slot>
        <Button type="link" size="small" @click="toggleAdvanced" v-if="showAdvancedButton && !hideAdvanceBtn">
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter"></slot>
      </FormItem>
    </div>
  </a-col>
</template>

<script lang="ts">
  import type { ColEx } from '../types/index'
  import { defineComponent, computed, PropType } from 'vue'
  import { Form, Col } from 'ant-design-vue'
  import { Button, ButtonProps } from '@/components/button'
  import { BasicArrow } from '@/components/basic'
  import { propTypes } from '@/utils/prop-types'
  import { useFormContext } from '../hooks/use-form-context'

  type ButtonOptions = Partial<ButtonProps> & { text: string }

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      Button,
      BasicArrow,
      [Col.name]: Col,
      FormItem: Form.Item
    },
    props: {
      // 显示操作按钮
      showActionButtonGroup: propTypes.bool.def(true),
      // 是否显示重置按钮
      showResetButton: propTypes.bool.def(true),
      // 是否显示提交按钮
      showSubmitButton: propTypes.bool.def(true),
      // 是否显示展开按钮
      showAdvancedButton: propTypes.bool.def(true),
      // 重置按钮设置
      resetButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({})
      },
      // 提交按钮设置
      submitButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({})
      },
      // 操作按钮间隔设置
      actionColOptions: {
        type: Object as PropType<Partial<ColEx>>,
        default: () => ({})
      },
      // 操作按钮间隔
      actionSpan: propTypes.number.def(6),
      // 是否展开状态
      isAdvanced: propTypes.bool,
      // 是否隐藏折叠展开按钮
      hideAdvanceBtn: propTypes.bool
    },
    emits: ['toggle-advanced'],
    setup(props, { emit }) {
      const actionColOpt = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props
        const actionSpan = 24 - span
        const advancedSpanObj = showAdvancedButton ? { span: actionSpan < 6 ? 24 : actionSpan } : {}
        const actionColOpt: Partial<ColEx> = {
          style: { textAlign: 'right' },
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions
        }
        return actionColOpt
      })

      const getResetBtnOptions = computed((): ButtonOptions => {
        return Object.assign(
          {
            text: '重置'
          },
          props.resetButtonOptions
        )
      })

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: '查询'
          },
          props.submitButtonOptions
        )
      })

      function toggleAdvanced() {
        emit('toggle-advanced')
      }

      return {
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        ...useFormContext()
      }
    }
  })
</script>

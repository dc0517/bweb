<template>
  <div :class="prefixCls" v-if="showFooter || $slots.footer">
    <template v-if="!$slots.footer">
      <slot name="insertFooter"></slot>
      <a-button v-bind="cancelButtonProps" @click="handleClose" class="mr-2" v-if="showCancelBtn">
        {{ cancelText }}
      </a-button>
      <slot name="centerFooter"></slot>
      <a-button :type="okType" @click="handleOk" v-bind="okButtonProps" class="mr-2" :loading="confirmLoading" v-if="showOkBtn">
        {{ okText }}
      </a-button>
      <slot name="appendFooter"></slot>
    </template>

    <template v-else>
      <slot name="footer"></slot>
    </template>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { useDesign } from '@/hooks/web/use-design'
  import { footerProps } from '../props'

  export default defineComponent({
    name: 'BasicDrawerFooter',
    props: {
      ...footerProps
    },
    emits: ['ok', 'close'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-footer')

      function handleOk() {
        emit('ok')
      }

      function handleClose() {
        emit('close')
      }
      return { handleOk, prefixCls, handleClose }
    }
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-drawer-footer';

  .@{prefix-cls} {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 12px 0 20px;
    text-align: right;
    background-color: @component-background;
    border-top: 1px solid @border-color-base;
    height: @drawer-footer-height;
    line-height: @drawer-footer-height;

    > * {
      margin-right: 8px;
    }
  }
</style>

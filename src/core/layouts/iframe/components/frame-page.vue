<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef" @load="hideLoading"></iframe>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue'
  import { ref, unref, computed } from 'vue'
  import { Spin } from 'ant-design-vue'
  import { useWindowSizeFn } from '@/hooks/event/use-window-size'
  import { propTypes } from '@/utils/prop-types'
  import { useDesign } from '@/hooks/web/use-design'
  import { useLayoutHeight } from '@/layouts/default/content/hooks/use-content-view-height'

  defineProps({
    frameSrc: propTypes.string.def('')
  })

  const loading = ref(true)
  const topRef = ref(50)
  const heightRef = ref(window.innerHeight)
  const frameRef = ref<HTMLFrameElement>()
  const { headerHeightRef } = useLayoutHeight()

  const { prefixCls } = useDesign('iframe-page')
  useWindowSizeFn(calcHeight, 150, { immediate: true })

  // 获取高度
  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`
    }
  })
  // 计算高度
  function calcHeight() {
    const iframe = unref(frameRef)
    if (!iframe) {
      return
    }
    const top = headerHeightRef.value
    topRef.value = top
    heightRef.value = window.innerHeight - top
    const clientHeight = document.documentElement.clientHeight - top
    iframe.style.height = `${clientHeight}px`
  }
  // 隐藏Loading
  function hideLoading() {
    loading.value = false
    calcHeight()
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: @component-background;
      border: 0;
      box-sizing: border-box;
    }
  }
</style>

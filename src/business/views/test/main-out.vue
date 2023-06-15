<template>
  <div :class="prefixCls">
    <div class="flex justify-end w-full pt-40px pr-30px">
      <div :class="`${prefixCls}-logout`" @click="handleToModule">
        <span>首页</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { router } from '@/router'
  import { useDesign } from '@/hooks/web/use-design'

  const { prefixCls } = useDesign('module-page')

  /**
   * 路由切换
   */
  const handleToModule = async () => {
    await router.replace('/module')
  }
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-module-page';

  .@{prefix-cls} {
    background: url('@/assets/images/module/module-bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    width: 100%;
    height: 100%;

    &-logout {
      color: #fff;
      cursor: pointer;
      font-size: 22px;
      font-weight: 400;
      line-height: 30px;
    }
  }
</style>

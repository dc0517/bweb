<template>
  <div>
    <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { BackTop } from 'ant-design-vue'
  import { useRootConfig } from '@/hooks/config/use-root-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { useUserStoreWithOut } from '@s/store/modules/user'

  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop
    },
    setup() {
      const { getUseOpenBackTop } = useRootConfig()
      const userStore = useUserStoreWithOut()
      const { prefixCls } = useDesign('setting-drawer-feature')

      return {
        getTarget: () => document.body,
        getUseOpenBackTop,
        prefixCls
      }
    }
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-drawer-feature';

  .@{prefix-cls} {
    position: absolute;
    top: 45%;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 10px;
    color: @white;
    cursor: pointer;
    background-color: @primary-color;
    border-radius: 6px 0 0 6px;
    justify-content: center;
    align-items: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>

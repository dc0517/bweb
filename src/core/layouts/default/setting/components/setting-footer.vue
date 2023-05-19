<template>
  <div :class="prefixCls">
    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      重置
    </a-button>
    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      退出登录
    </a-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { RedoOutlined } from '@ant-design/icons-vue'
  import defaultSetting from '@/config/project-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { useMessage } from '@/hooks/web/use-message'
  import { useAppStore } from '@/store/app'
  import { usePermissionStore } from '@/store/permission'
  import { useUserStore } from '@s/store/modules/user'

  export default defineComponent({
    name: 'SettingFooter',
    components: { RedoOutlined },
    setup() {
      const permissionStore = usePermissionStore()
      const { prefixCls } = useDesign('setting-footer')
      const { createMessage } = useMessage()
      const userStore = useUserStore()
      const appStore = useAppStore()

      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultSetting)
          createMessage.success('重置成功')
        } catch (error: any) {
          createMessage.error(error)
        }
      }

      function handleClearAndRedo() {
        localStorage.clear()
        appStore.resetAllState()
        permissionStore.resetState()
        userStore.resetState()
        location.reload()
      }
      return {
        prefixCls,
        handleResetSetting,
        handleClearAndRedo
      }
    }
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

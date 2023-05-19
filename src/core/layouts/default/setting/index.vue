<template>
  <div>
    <Icon icon="ion:settings-outline" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import Icon from '/@/components/icon'

  export default defineComponent({
    name: 'SettingButton',
    components: { Icon },
    setup() {
      return {}
    }
  })
</script>

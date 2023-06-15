<template>
  <Tooltip title="模块页" placement="bottom" :mouseEnterDelay="0.5" @click="handleToHome">
    <HomeOutlined class="home-icon" />
  </Tooltip>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Tooltip } from 'ant-design-vue'
  import { HomeOutlined } from '@ant-design/icons-vue'
  import Icon from '@/components/icon'
  import { PageEnum } from '@/constants/enums/page-enum'
  import { router } from '@/router'

  export default defineComponent({
    name: 'Dashboard',
    components: { Icon, Tooltip, HomeOutlined },
    setup() {
      const handleToHome = async () => {
        await router.replace(PageEnum.BASE_MODULE)
      }

      return {
        handleToHome
      }
    }
  })
</script>

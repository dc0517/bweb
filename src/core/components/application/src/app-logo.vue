<template>
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <img class="app-logo" src="/resource/logo.png" />
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AppLogo'
  }
</script>

<script lang="ts" setup>
  import { computed, unref } from 'vue'
  import { PageEnum } from '@/constants/enums/page-enum'
  import { useGo } from '@/hooks/web/use-page'
  import { useGlobConfig } from '@/hooks/config'
  import { useMenuConfig } from '@/hooks/config/use-menu-config'
  import { useDesign } from '@/hooks/web/use-design'
  import { useUserStore } from '@s/store/modules/user'

  const props = defineProps({
    showTitle: { type: Boolean, default: true },
    alwaysShowTitle: { type: Boolean }
  })
  const { prefixCls } = useDesign('app-logo')
  const { getCollapsedShowTitle } = useMenuConfig()
  const userStore = useUserStore()
  const { title } = useGlobConfig()

  const getAppLogoClass = computed(() => [prefixCls, { 'collapsed-show-title': unref(getCollapsedShowTitle) }])
  const getTitleClass = computed(() => [
    `${prefixCls}__title`,
    {
      'xs:opacity-0': !props.alwaysShowTitle
    }
  ])
  const go = useGo()

  function goHome() {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
  }
</script>

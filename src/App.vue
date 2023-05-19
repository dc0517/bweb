<template>
  <ConfigProvider :locale="zhCN">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue'
  import { AppProvider } from '@/components/application'
  import { useTitle } from '@/hooks/web/use-title'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  dayjs.locale('en')
  useTitle()
</script>

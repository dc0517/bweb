<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition :name="getTransitionName({ route, enableTransition: getEnableTransition, def: getBasicTransition })" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import FrameLayout from '@/layouts/iframe/index.vue'
  import { useRootConfig } from '@/hooks/config/use-root-config'
  import { useTransitionConfig } from '@/hooks/config/use-transition-config'
  import { getTransitionName } from './transition'

  export default defineComponent({
    name: 'MainOut',
    components: { FrameLayout },
    setup() {
      const { getBasicTransition, getEnableTransition } = useTransitionConfig()

      return {
        getTransitionName,
        getEnableTransition,
        getBasicTransition
      }
    }
  })
</script>

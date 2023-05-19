<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}`]" class="flex">
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>
    <template #overlay>
      <AMenu @click="handleMenuClick">
        <MenuItem key="logout" text="退出登录" icon="ion:power-outline" />
      </AMenu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface'
  import { Dropdown, Menu } from 'ant-design-vue'
  import { defineComponent, computed } from 'vue'
  import { useDesign } from '@/hooks/web/use-design'
  import { createAsyncComponent } from '@/utils/async-component'
  import { useUserStore } from '@s/store/modules/user'

  type MenuEvent = 'logout'

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      AMenu: Menu,
      MenuItem: createAsyncComponent(() => import('./components/drop-menu-item.vue'))
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown')
      const userStore = useUserStore()

      const getUserInfo = computed(() => {
        const { realName = '', desc } = userStore.getUserInfo || {}
        return { realName, desc }
      })

      // 退出登录
      function handleLoginOut() {
        userStore.confirmLoginOut()
      }

      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'logout':
            handleLoginOut()
            break
        }
      }

      return {
        prefixCls,
        getUserInfo,
        handleMenuClick
      }
    }
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 24px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 20px;
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 120px;
      }
    }
  }
</style>

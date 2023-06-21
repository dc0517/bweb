<template>
  <div :class="prefixCls">
    <div class="flex justify-end w-full pt-40px pr-30px">
      <div :class="`${prefixCls}-logout`" @click="handleLogout">
        <span>退出</span>
      </div>
    </div>
    <div :class="`${prefixCls}-content`">
      <div class="content-title">{{ projectName }}</div>
      <div class="flex content-card gap-30px">
        <div class="content-card-item" v-for="item in menuList" :key="item.key" @click="handleMenu(item.path)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { router } from '@/router'
  import { useDesign } from '@/hooks/web/use-design'
  import { getShallowMenus } from '@/router/menus'
  import { useUserStore } from '@s/store/modules/user'

  const projectName = import.meta.env.VITE_GLOB_APP_TITLE

  const { prefixCls } = useDesign('module-page')
  const userStore = useUserStore()

  const menuList = ref([])

  const getMenuData = async () => {
    const shallowMenus = await getShallowMenus()
    if (shallowMenus?.length) {
      menuList.value = shallowMenus.map((item) => {
        return {
          key: item.path,
          name: item.name,
          path: item.path
        }
      })
    }
  }

  getMenuData()

  /**
   * 路由切换
   */
  const handleMenu = async (path) => {
    await router.replace(path)
  }

  /**
   * 退出登录
   */
  const handleLogout = () => {
    userStore.confirmLoginOut()
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

    &-content {
      width: 100%;
      height: calc(100vh -70px);

      .content-title {
        font-size: 60px;
        font-weight: 500;
        color: #ffffff;
        line-height: 70px;
        text-align: center;
        padding-top: 70px;
      }

      .content-card {
        flex-wrap: wrap;
        max-width: 1220px;
        min-width: 380px;
        margin: 80px auto 0;
        height: 510px;

        &-item {
          width: 380px;
          height: 240px;
          background: #ffffff;
          border-radius: 10px;
          cursor: pointer;
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          text-align: center;
          margin: auto;
        }
      }
    }
  }
</style>

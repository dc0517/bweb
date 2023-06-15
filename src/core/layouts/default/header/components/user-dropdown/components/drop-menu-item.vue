<template>
  <MenuItem :key="itemKey">
    <span class="flex items-center">
      <slot name="icon"></slot>
      <span class="ml-2">{{ text }}</span>
    </span>
  </MenuItem>
</template>

<script lang="ts">
  import { Menu } from 'ant-design-vue'
  import { computed, defineComponent, getCurrentInstance } from 'vue'
  import Icon from '@/components/icon/index'
  import { propTypes } from '@/utils/prop-types'

  export default defineComponent({
    name: 'DropdownMenuItem',
    components: { MenuItem: Menu.Item, Icon },
    props: {
      // eslint-disable-next-line
      key: propTypes.string,
      text: propTypes.string,
      icon: propTypes.string
    },
    setup(props) {
      const instance = getCurrentInstance()
      const itemKey = computed(() => props.key || instance?.vnode?.props?.key)
      return { itemKey }
    }
  })
</script>

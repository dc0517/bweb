<template>
  <div class="table-settings">
    <RedoSetting v-if="getSetting.redo" :getPopupContainer="getTableContainer" />
    <SizeSetting v-if="getSetting.size" :getPopupContainer="getTableContainer" />
    <ColumnSetting v-if="getSetting.setting" @columns-change="handleColumnChange" :getPopupContainer="getTableContainer" />
    <FullScreenSetting v-if="getSetting.fullScreen" :getPopupContainer="getTableContainer" />
  </div>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { TableSetting, ColumnChangeParam } from '../../types/table'
  import { defineComponent, computed, unref } from 'vue'
  import ColumnSetting from './column-setting.vue'
  import SizeSetting from './size-setting.vue'
  import RedoSetting from './redo-setting.vue'
  import FullScreenSetting from './full-screen-setting.vue'
  import { useTableContext } from '../../hooks/use-table-context'

  export default defineComponent({
    name: 'TableSetting',
    components: {
      ColumnSetting,
      SizeSetting,
      RedoSetting,
      FullScreenSetting
    },
    props: {
      setting: {
        type: Object as PropType<TableSetting>,
        default: () => ({})
      }
    },
    emits: ['columns-change'],
    setup(props, { emit }) {
      const table = useTableContext()

      const getSetting = computed((): TableSetting => {
        return {
          redo: true,
          size: true,
          setting: true,
          fullScreen: false,
          ...props.setting
        }
      })

      function handleColumnChange(data: ColumnChangeParam[]) {
        emit('columns-change', data)
      }

      function getTableContainer() {
        return table ? unref(table.wrapRef) : document.body
      }

      return { getSetting, handleColumnChange, getTableContainer }
    }
  })
</script>
<style lang="less">
  .table-settings {
    & > * {
      margin-right: 12px;
    }

    svg {
      width: 1.3em;
      height: 1.3em;
    }
  }
</style>

<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import type { SubMenuProvider } from './types'
  import { defineComponent, ref, computed, onMounted, watchEffect, watch, nextTick, getCurrentInstance, provide } from 'vue'
  import { useDesign } from '@/hooks/web/use-design'
  import { propTypes } from '@/utils/prop-types'
  import { createSimpleRootMenuContext } from '../hooks/use-simple-menu-context'
  import mitt from '@/utils/mitt'

  export default defineComponent({
    name: 'Menu',
    props: {
      activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
      openNames: {
        type: Array as PropType<string[]>,
        default: () => []
      },
      accordion: propTypes.bool.def(true),
      width: propTypes.string.def('100%'),
      collapsedWidth: propTypes.string.def('48px'),
      indentSize: propTypes.number.def(16),
      collapse: propTypes.bool.def(true),
      activeSubMenuNames: {
        type: Array as PropType<(string | number)[]>,
        default: () => []
      }
    },
    emits: ['select', 'open-change'],
    setup(props, { emit }) {
      const rootMenuEmitter = mitt()
      const instance = getCurrentInstance()
      const currentActiveName = ref<string | number>('')
      const openedNames = ref<string[]>([])
      const isRemoveAllPopup = ref(false)
      const { prefixCls } = useDesign('menu')

      createSimpleRootMenuContext({
        rootMenuEmitter: rootMenuEmitter,
        activeName: currentActiveName
      })

      const getClass = computed(() => {
        return [
          prefixCls,
          `${prefixCls}-light`,
          `${prefixCls}-vertical`,
          {
            [`${prefixCls}-collapse`]: props.collapse
          }
        ]
      })

      watchEffect(() => {
        openedNames.value = props.openNames
      })

      watchEffect(() => {
        if (props.activeName) {
          currentActiveName.value = props.activeName
        }
      })

      watch(
        () => props.openNames,
        () => {
          nextTick(() => {
            updateOpened()
          })
        }
      )

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames.value)
      }

      function addSubMenu(name: string) {
        if (openedNames.value.includes(name)) return
        openedNames.value.push(name)
        updateOpened()
      }

      function removeSubMenu(name: string) {
        openedNames.value = openedNames.value.filter((item) => item !== name)
        updateOpened()
      }

      function removeAll() {
        openedNames.value = []
        updateOpened()
      }

      function sliceIndex(index: number) {
        if (index === -1) return
        openedNames.value = openedNames.value.slice(0, index + 1)
        updateOpened()
      }

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        isRemoveAllPopup,
        level: 0,
        props: props as any,
        addSubMenu,
        removeSubMenu,
        getOpenNames: () => openedNames.value,
        removeAll,
        sliceIndex
      })

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : []
        updateOpened()
        rootMenuEmitter.on('on-menu-item-select', (name: string) => {
          currentActiveName.value = name
          nextTick(() => {
            props.collapse && removeAll()
          })
          emit('select', name)
        })
        rootMenuEmitter.on('open-name-change', ({ name, opened }) => {
          if (opened && !openedNames.value.includes(name)) {
            openedNames.value.push(name)
          } else if (!opened) {
            const index = openedNames.value.findIndex((item) => item === name)
            index !== -1 && openedNames.value.splice(index, 1)
          }
        })
      })

      return { getClass, openedNames }
    }
  })
</script>

<style lang="less">
  @import './menu.less';
</style>

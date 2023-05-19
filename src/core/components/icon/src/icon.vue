<!--
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: lhl
 * @LastEditTime: 2023-05-15 14:03:51
 * @FilePath: \basic-web-beat\src\core\components\icon\src\icon.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <SvgIcon :size="size" :name="getSvgIcon" v-if="isSvgIcon" :class="[$attrs.class, 'anticon']" :spin="spin" />
  <span v-else ref="elRef" :class="[$attrs.class, 'app-iconify anticon', spin && 'app-iconify-spin']" :style="getWrapStyle"></span>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, ref, watch, onMounted, nextTick, unref, computed, CSSProperties } from 'vue'
  import { isString } from '@/utils/is'
  import { propTypes } from '@/utils/prop-types'
  import SvgIcon from './svg-icon.vue'

  const SVG_END_WITH_FLAG = '|svg'

  export default defineComponent({
    name: 'Icon',
    components: { SvgIcon },
    props: {
      // icon name
      icon: propTypes.string,
      // icon color
      color: propTypes.string,
      // icon size
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 16
      },
      spin: propTypes.bool.def(false),
      prefix: propTypes.string.def('')
    },
    setup(props) {
      const elRef = ref<ElRef>(null)

      const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
      const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
      const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`)

      const update = async () => {
        if (unref(isSvgIcon)) return

        const el = unref(elRef)
        if (!el) return

        await nextTick()
        const icon = unref(getIconRef)
        if (!icon) return

        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = icon
        el.textContent = ''
        el.appendChild(span)
      }

      const getWrapStyle = computed((): CSSProperties => {
        const { size, color } = props
        let fs = size
        if (isString(size)) {
          fs = parseInt(size, 10)
        }
        return {
          fontSize: `${fs}px`,
          color: color,
          display: 'inline-flex'
        }
      })

      watch(() => props.icon, update, { flush: 'post' })

      onMounted(update)

      return { elRef, getWrapStyle, isSvgIcon, getSvgIcon }
    }
  })
</script>

<style lang="less">
  .app-iconify {
    display: inline-block;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    background-color: @iconify-bg-color;
    border-radius: 100%;
  }
</style>

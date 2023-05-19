<template>
  <a-cascader
    v-model:value="state"
    :options="options"
    :load-data="loadData"
    change-on-select
    @change="handleChange"
    :displayRender="handleRenderDisplay"
  >
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        请等待数据加载完成...
      </span>
    </template>
  </a-cascader>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, unref, watch, watchEffect } from 'vue'
  import { Cascader } from 'ant-design-vue'
  import { LoadingOutlined } from '@ant-design/icons-vue'
  import { get, omit } from 'lodash-es'
  import { useRuleFormItem } from '@/hooks/component/use-form-item'
  import { propTypes } from '@/utils/prop-types'
  import { isFunction } from '@/utils/is'

  interface Option {
    value: string
    label: string
    loading?: boolean
    isLeaf?: boolean
    children?: Option[]
  }

  /**
   * 动态级联选择器
   */
  export default defineComponent({
    name: 'ApiCascader',
    components: {
      LoadingOutlined,
      [Cascader.name]: Cascader
    },
    props: {
      value: {
        type: Array
      },
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<Option[]>>,
        default: null
      },
      numberToString: propTypes.bool,
      // api result字段
      resultField: propTypes.string.def(''),
      // label 字段名称
      labelField: propTypes.string.def('label'),
      // value 字段名称
      valueField: propTypes.string.def('value'),
      // children 字段名称
      childrenField: propTypes.string.def('children'),
      // 异步请求key
      asyncFetchParamKey: propTypes.string.def('parentCode'),
      // 初始时是否请求
      immediate: propTypes.bool.def(true),
      // 初始化请求参数
      initFetchParams: {
        type: Object as PropType<Recordable>,
        default: () => ({})
      },
      // 是否有下级，默认是
      isLeaf: {
        type: Function as PropType<(arg: Recordable) => boolean>,
        default: null
      },
      // 默认渲染数组
      displayRenderArray: {
        type: Array
      }
    },
    emits: ['change', 'defaultChange'],
    setup(props, { emit }) {
      const apiData = ref<any[]>([])
      const options = ref<Option[]>([])
      const loading = ref<boolean>(false)
      const emitData = ref<any[]>([])
      const isFirstLoad = ref(true)
      const [state] = useRuleFormItem(props, 'value', 'change', emitData)

      watch(
        apiData,
        (data) => {
          const opts = generatorOptions(data)
          options.value = opts
        },
        { deep: true }
      )

      function generatorOptions(options: any[]): Option[] {
        const { labelField, valueField, numberToString, childrenField, isLeaf } = props
        return options.reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[valueField]
            const item = {
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: numberToString ? `${value}` : value,
              isLeaf: isLeaf && typeof isLeaf === 'function' ? isLeaf(next) : false
            }
            const children = Reflect.get(next, childrenField)
            if (children) {
              Reflect.set(item, childrenField, generatorOptions(children))
            }
            prev.push(item)
          }
          return prev
        }, [] as Option[])
      }

      /**
       * 接口请求
       */
      async function initialFetch() {
        const api = props.api
        if (!api || !isFunction(api)) return
        apiData.value = []
        loading.value = true
        try {
          const res = await api(props.initFetchParams)
          if (Array.isArray(res)) {
            apiData.value = res
            return
          }
          if (props.resultField) {
            apiData.value = get(res, props.resultField) || []
          }
        } catch (error) {
          console.warn(error)
        } finally {
          loading.value = false
        }
      }

      /**
       * 数据加载
       */
      async function loadData(selectedOptions: Option[]) {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        targetOption.loading = true

        const api = props.api
        if (!api || !isFunction(api)) return
        try {
          const res = await api({
            [props.asyncFetchParamKey]: Reflect.get(targetOption, 'value')
          })
          if (Array.isArray(res)) {
            const children = generatorOptions(res)
            targetOption.children = children
            return
          }
          if (props.resultField) {
            const children = generatorOptions(get(res, props.resultField) || [])
            targetOption.children = children
          }
        } catch (e) {
          console.error(e)
        } finally {
          targetOption.loading = false
        }
      }

      watchEffect(() => {
        props.immediate && initialFetch()
      })

      watch(
        () => props.initFetchParams,
        () => {
          !unref(isFirstLoad) && initialFetch()
        },
        { deep: true }
      )

      function handleChange(keys, args) {
        emitData.value = args
        emit('defaultChange', keys, args)
      }

      function handleRenderDisplay({ labels, selectedOptions }) {
        if (unref(emitData).length === selectedOptions.length) {
          return labels.join(' / ')
        }
        if (props.displayRenderArray) {
          return props.displayRenderArray.join(' / ')
        }
        return ''
      }

      return {
        state,
        options,
        loading,
        handleChange,
        loadData,
        handleRenderDisplay
      }
    }
  })
</script>

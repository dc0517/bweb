import type { UnwrapRef, Ref, WritableComputedRef, DeepReadonly } from 'vue'
import { reactive, readonly, computed, getCurrentInstance, watchEffect, unref, toRaw } from 'vue'
import { isEqual } from 'lodash-es'

export function useRuleFormItem<T extends Recordable, K extends keyof T, V = UnwrapRef<T[K]>>(
  props: T,
  key?: K,
  changeEvent?,
  emitData?: Ref<any[]>
): [WritableComputedRef<V>, (val: V) => void, DeepReadonly<V>]

export function useRuleFormItem<T extends Recordable>(props: T, key: keyof T = 'value', changeEvent = 'change', emitData?: Ref<any[]>) {
  // 初始化实例
  const instance = getCurrentInstance()
  const emit = instance?.emit
  // 内部状态
  const innerState = reactive({
    value: props[key]
  })
  // 默认状态
  const defaultState = readonly(innerState)
  // 状态更新/获取
  const state: any = computed({
    get() {
      return innerState.value
    },
    set(value) {
      if (isEqual(value, defaultState.value)) return
      innerState.value = value as T[keyof T]
      emit?.(changeEvent, value, ...(toRaw(unref(emitData)) || []))
    }
  })
  // 设置内部状态值
  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val as T[keyof T]
  }

  watchEffect(() => {
    innerState.value = props[key]
  })

  return [state, defaultState, setState]
}

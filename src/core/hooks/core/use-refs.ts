import type { Ref } from 'vue'
import { ref, onBeforeUpdate } from 'vue'

export function useRefs(): [Ref<HTMLElement[]>, (index: number) => (el: HTMLElement) => void] {
  const refs = ref([]) as Ref<HTMLElement[]>

  const setRefs = (index: number) => (el: HTMLElement) => {
    refs.value[index] = el
  }

  onBeforeUpdate(() => {
    refs.value = []
  })

  return [refs, setRefs]
}

import { watch, unref } from 'vue'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useGlobConfig } from '@/hooks/config'
import { REDIRECT_NAME } from '@/constants/constants/route'

export function useTitle() {
  const { title } = useGlobConfig()
  const { currentRoute } = useRouter()
  const pageTitle = usePageTitle()

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute)
      if (route.name === REDIRECT_NAME) {
        return
      }
      const routeTitle = route?.meta?.title as string
      pageTitle.value = routeTitle ? ` ${routeTitle} - ${title} ` : `${title}`
    },
    { immediate: true }
  )
}

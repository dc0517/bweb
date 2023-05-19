import type { FunctionalComponent } from 'vue'
import type { RouteLocation } from 'vue-router'

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable }
  route: RouteLocation
}

export function getTransitionName({
  route,
  openCache,
  enableTransition,
  def
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean
  openCache: boolean
  def: string
}): string | undefined {
  if (!enableTransition) {
    return undefined
  }
  const transitionName = 'fade-slide'
  let name: string | undefined = transitionName

  if (openCache) {
    name = route.meta.loaded ? transitionName : undefined
  }
  return name || (route.meta.transitionName as string) || def
}

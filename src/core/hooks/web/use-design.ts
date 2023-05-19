import { useAppProviderContext } from './use-app-context'

export function useDesign(scope: string) {
  const values = useAppProviderContext()
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  }
}

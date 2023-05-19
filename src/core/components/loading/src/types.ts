import { SizeEnum } from '@/constants/enums/size-enum'

export interface LoadingProps {
  tip: string
  size: SizeEnum
  absolute: boolean
  loading: boolean
  background: string
}

import { MenuModeEnum, MenuTypeEnum } from '@/constants/enums/menu-enum'

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}

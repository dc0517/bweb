import { Ref } from 'vue'

export interface MenuState {
  activeName: string
  activeSubMenuNames: string[]
  openNames: string[]
}

export interface Props {
  accordion: boolean
  activeName?: string | number | undefined
  activeSubMenuNames: (string | number)[]
  collapse: boolean
  collapsedWidth: string
  indentSize: number
  openNames: string[]
  width: string
}

export interface SubMenuProvider {
  isRemoveAllPopup: Ref<boolean>
  level: number
  props: Props
  addSubMenu: (name: string | number, update?: boolean) => void
  removeSubMenu: (name: string | number, update?: boolean) => void
  removeAll: () => void
  sliceIndex: (index: number) => void
  getOpenNames: () => (string | number)[]
  handleMouseleave?: Fn
}

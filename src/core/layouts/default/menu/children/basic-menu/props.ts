import type { MenuMode } from 'ant-design-vue/lib/menu/src/interface'
import type { Menu } from '@/router/types'
import type { PropType } from 'vue'
import { MenuModeEnum, MenuTypeEnum } from '@/constants/enums/menu-enum'
import { propTypes } from '@/utils/prop-types'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => []
  },
  collapsedShowTitle: propTypes.bool,
  // inline 模式的菜单缩进宽度(最好是4 倍数)
  inlineIndent: propTypes.number.def(20),
  // 菜单组件的mode属性
  mode: {
    type: String as PropType<MenuMode>,
    default: MenuModeEnum.INLINE
  },
  // 菜单类型
  type: {
    type: String as PropType<MenuTypeEnum>,
    default: MenuTypeEnum.MIX
  },
  // inline 时菜单是否收起状态
  inlineCollapsed: propTypes.bool,
  // 是否混合侧边栏
  mixSider: propTypes.bool,
  // 菜单是否水平模式
  isHorizontal: propTypes.bool,
  // 手风琴模式，只展示一个菜单
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<(key: string) => Promise<boolean>>
  }
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: () => ({})
  },
  level: propTypes.number,
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null
  },
  showTitle: propTypes.bool.def(true),
  level: propTypes.number.def(0),
  isHorizontal: propTypes.bool.def(true)
}

import { CSSProperties, VNodeChild } from 'vue'
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types'

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>
  readonly VNodeChild: VueTypeValidableDef<VueNode>
}

export type VueNode = VNodeChild | JSX.Element

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes

// propTypes.extend({
//   name: 'style',
//   getter: true,
//   type: [String, Object],
//   default: undefined,
//   validator: (v) => v < 0
// })

// propTypes.extend({
//   name: 'VNodeChild',
//   getter: true,
//   type: undefined
// })

export { propTypes }

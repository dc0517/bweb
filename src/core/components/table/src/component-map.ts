import type { Component } from 'vue'
import type { ComponentType } from './types/component-type'
import { Input, Select, Checkbox, InputNumber, Switch, DatePicker, TimePicker, AutoComplete, Radio } from 'ant-design-vue'
import { ApiSelect, ApiTreeSelect, RadioButtonGroup, ApiRadioGroup } from '@/components/form'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputNumber', InputNumber)
componentMap.set('Select', Select)
componentMap.set('ApiSelect', ApiSelect)
componentMap.set('AutoComplete', AutoComplete)
componentMap.set('ApiTreeSelect', ApiTreeSelect)
componentMap.set('Switch', Switch)
componentMap.set('Checkbox', Checkbox)
componentMap.set('DatePicker', DatePicker)
componentMap.set('TimePicker', TimePicker)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('RadioButtonGroup', RadioButtonGroup)
componentMap.set('ApiRadioGroup', ApiRadioGroup)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }

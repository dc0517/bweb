/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: DongChen 2634403005@qq.com
 * @LastEditTime: 2023-05-12 16:19:29
 * @FilePath: \basic-web-beat\src\core\layouts\default\menu\children\simple-menu\hooks\use-menu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { CSSProperties } from 'vue'
import { computed, ComponentInternalInstance, unref } from 'vue'

export function useMenuItem(instance: ComponentInternalInstance | null) {
  const getParentMenu = computed(() => {
    return findParentMenu(['Menu', 'SubMenu'])
  })

  const getParentRootMenu = computed(() => {
    return findParentMenu(['Menu'])
  })

  const getParentSubMenu = computed(() => {
    return findParentMenu(['SubMenu'])
  })

  const getItemStyle = computed((): CSSProperties => {
    let parent = instance?.parent
    if (!parent) return {}
    const indentSize = (unref(getParentRootMenu)?.props.indentSize as number) ?? 20
    let padding = indentSize

    if (unref(getParentRootMenu)?.props.collapse) {
      padding = indentSize
    } else {
      while (parent && parent.type.name !== 'Menu') {
        if (parent.type.name === 'SubMenu') {
          padding += indentSize
        }
        parent = parent.parent
      }
    }
    return { paddingLeft: padding + 'px' }
  })

  function findParentMenu(name: string[]) {
    let parent = instance?.parent
    if (!parent) return null
    while (parent && name.indexOf(parent.type.name!) === -1) {
      parent = parent.parent
    }
    return parent
  }

  function getParentList() {
    let parent = instance
    if (!parent)
      return {
        uidList: [],
        list: []
      }
    const ret: any[] = []
    while (parent && parent.type.name !== 'Menu') {
      if (parent.type.name === 'SubMenu') {
        ret.push(parent)
      }
      parent = parent.parent
    }
    const result = {
      uidList: ret.map((item) => item.uid),
      list: ret
    }
    return result
  }

  function getParentInstance(instance: ComponentInternalInstance, name = 'SubMenu') {
    let parent = instance.parent
    while (parent) {
      if (parent.type.name !== name) {
        return parent
      }
      parent = parent.parent
    }
    return parent
  }

  return {
    getParentMenu,
    getParentRootMenu,
    getParentSubMenu,
    getItemStyle,
    getParentInstance,
    getParentList
  }
}

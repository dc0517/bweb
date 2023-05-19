import { getThemeVariables } from 'ant-design-vue/dist/theme'
import { generateAntColors, primaryColor } from '../config/theme-config'
import { resolve } from 'path'

/**
 * 全局less变量
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor)
  const primary = palettes[5]
  const primaryColorObj: Record<string, string> = {}

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index]
  }

  const modifyVars = getThemeVariables({ dark })
  return {
    ...modifyVars,
    // 用于全局导入，以避免需要分别导入每个样式文件
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/core/styles/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '16px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa' //   Link color
  }
}

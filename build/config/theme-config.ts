/*
 * @Author: DongChen 2634403005@qq.com
 * @Date: 2023-05-10 13:42:05
 * @LastEditors: DongChen 2634403005@qq.com
 * @LastEditTime: 2023-05-12 14:17:00
 * @FilePath: \basic-web-beat\build\config\theme-config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generate } from '@ant-design/colors'

type Fn = (...arg: any) => any

export const primaryColor = '#0091FF'

export interface GenerateColorsParams {
  mixLighten: Fn
  mixDarken: Fn
  tinycolor: any
  color?: string
}

export function generateAntColors(color: string) {
  return generate(color)
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor
  const lightColors = generateAntColors(tc)
  const primary = lightColors[5]
  const modeColors = generateAntColors(primary)
  return [...lightColors, ...modeColors]
}

export function generateColors({ color = primaryColor, mixLighten, mixDarken, tinycolor }: GenerateColorsParams) {
  const arr = new Array(19).fill(0)
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5)
  })
  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5)
  })
  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString()
  })
  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'))
  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#ffffff')
  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString()
    })
    .filter((item) => item !== '#000000')

  return [...lightens, ...darkens, ...alphaColors, ...shortAlphaColors, ...tinycolorDarkens, ...tinycolorLightens].filter(
    (item) => !item.includes('-')
  )
}

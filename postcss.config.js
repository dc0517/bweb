module.exports = () => {
  return {
    plugins: {
      'postcss-px-to-viewport': {
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: 1920, //  设计稿的视口宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'], // 能转化为vw的属性列表
        viewportUnit: 'vw', //  希望使用的视口单位
        fontViewportUnit: 'vw', // 字体使用的视口单位
        selectorBlackList: ['.ignore', '.hairlines', '.ig-', '#app'], // 需要忽略的CSS选择器
        minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, // 是否直接更换属性值，而不添加备用属性
        exclude: [/node_modules/, /shared/], // 设置忽略文件，GlobalApi 只需要写文件名称即可
        landscape: false // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      }
    }
  }
}

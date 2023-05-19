import fs, { writeFileSync } from 'fs-extra'
import colors from 'picocolors'
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant'
import { getConfigFileName, getEnvConfig, getRootPath } from '../utils'
import pkg from '../../package.json'

interface CreateConfigParams {
  config: any
  configName: string
  configFileName?: string
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params
  try {
    const windowConf = `window.${configName}`
    let configStr = `${windowConf}=${JSON.stringify(config)};`
    configStr += `
       Object.freeze(${windowConf});
       Object.defineProperty(window, "${configName}", {
         configurable: false,
         writable: false,
       });
     `.replace(/\s/g, '')

    fs.mkdirp(getRootPath(OUTPUT_DIR))
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr)

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`)
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n')
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error))
  }
}

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2)
    // 生成配置文件
    if (!argvList.includes('disabled-config')) {
      const config = getEnvConfig()
      const configFileName = getConfigFileName(config)
      createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME })
    }
    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!')
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error))
    process.exit(1)
  }
}

runBuild()

import type { UserConfig, ConfigEnv } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { createProxy } from './build/config/proxy-config'
import { generateModifyVars } from './build/generate/generate-modify-vars'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { OUTPUT_DIR } from './build/constant'
import excludeFiles from './buildignore.json'
import { fileURLToPath } from 'node:url'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// 构建时排除指定目录文件
const excludeFilesPath = excludeFiles.path.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url))
})

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: pathResolve('src') + '/core' + '/'
        },
        {
          find: '@b/',
          replacement: pathResolve('src') + '/business' + '/'
        },
        {
          find: '@s/',
          replacement: pathResolve('src') + '/shared' + '/'
        }
      ]
    },
    server: {
      host: true,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
    },
    build: {
      target: 'es2021',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      rollupOptions: {
        external: [...excludeFilesPath]
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true
        }
      }
    },
    plugins: await createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: ['@iconify/iconify', 'ant-design-vue/es/locale/zh_CN']
    }
  }
}

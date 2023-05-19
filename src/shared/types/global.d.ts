import type { VNodeChild, ComponentPublicInstance, FunctionalComponent, PropType as VuePropType } from 'vue'

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  // vue
  type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }
  type PropType<T> = VuePropType<T>
  type VueNode = VNodeChild | JSX.Element
  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ImportMetaEnv extends ViteEnv {
    __: unknown
  }
  interface ViteEnv {
    VITE_USE_MOCK: boolean
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_GLOB_APP_TITLE: string
    VITE_GLOB_APP_SHORT_NAME: string
    VITE_USE_CDN: boolean
    VITE_DROP_CONSOLE: boolean
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

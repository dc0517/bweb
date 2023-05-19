import { defineAsyncComponent } from 'vue'
import { Spin } from 'ant-design-vue'
import { noop } from '@/utils'

interface Options {
  size?: 'default' | 'small' | 'large'
  delay?: number
  timeout?: number
  loading?: boolean
  retry?: boolean
}
/**
 * 动态加载组件
 * @param loader
 * @param options
 * @returns
 */
export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin spinning={true} size={size} /> : undefined,
    timeout,
    delay,
    /**
     *
     * @param {*} error 错误消息对象
     * @param {*} retry 当加载器被拒绝时，指示异步组件是否应该重试
     * @param {*} fail  失败时结束
     * @param {*} attempts 最大重试次数
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry()
          } else {
            fail()
          }
        }
  })
}

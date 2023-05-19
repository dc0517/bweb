import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules: Record<string, any> = import.meta.glob('./**/*.ts')

const mockModules = Object.keys(modules).reduce((pre, key) => {
  if (!key.includes('/_')) {
    pre.push(...modules[key])
  }
  return pre
}, [] as any[])

export function setupMockServer() {
  createProdMockServer(mockModules)
}

/**
 * mock配置
 */
import { viteMockServe } from 'vite-plugin-mock'

export function mockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
       import { setupMockServer } from '../../mock/mock-server';
       setupMockServer();
       `
  })
}

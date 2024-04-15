import { isProduction } from '../utils/is-production.js'
import { BrowserListConfig } from '../types/configuration.type.js'
import { browserslistConfig } from './browserslist-config.js'

export const getEffectiveBrowserslistConfig = (browserslist: BrowserListConfig = browserslistConfig) => {
  if (Array.isArray(browserslist)) {
    return browserslist
  }
  return isProduction() ? browserslist.production : browserslist.development
}

export const getBabelConfig = (
  browserslist?: BrowserListConfig,
  importSource: 'react' | 'preact' = 'react',
  isTest = false,
) => ({
  presets: [
    ['@babel/preset-react', { runtime: 'automatic', importSource }],
    [
      '@babel/preset-env',
      isTest
        ? {}
        : {
            useBuiltIns: 'usage',
            corejs: '3.30.1',
            targets: {
              browsers: getEffectiveBrowserslistConfig(browserslist),
            },
          },
    ],
    '@babel/preset-typescript',
  ],
})

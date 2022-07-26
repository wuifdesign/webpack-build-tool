import { browserslistConfig } from './browserslist-config.js'
import { isProduction } from '../is-production.js'

export const getEffectiveBrowserslistConfig = (browserslist = browserslistConfig) => {
  if (Array.isArray(browserslist)) {
    return browserslist
  }
  return isProduction() ? browserslist.production : browserslist.development
}

export const getBabelConfig = (browserslist) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.24.0',
        targets: {
          browsers: getEffectiveBrowserslistConfig(browserslist)
        }
      }
    ],
    '@babel/preset-typescript'
  ]
})

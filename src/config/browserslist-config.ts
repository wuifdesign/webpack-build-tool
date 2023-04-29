import { BrowserListConfig } from '../types/configuration.type.js'

export const browserslistConfig: BrowserListConfig = {
  production: ['>0.2%', 'not dead', 'not op_mini all', 'ie >= 11'],
  development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
}

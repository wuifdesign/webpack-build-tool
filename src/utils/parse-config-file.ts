import { Configuration, ParsedConfiguration } from '../types/configuration.type.js'

export const parseConfigFile = (config: Configuration): ParsedConfiguration => {
  return {
    outDir: config.outDir || 'dist',
    entryFiles: config.entryFiles,
    browserslistConfig: config.browserslist,
    jestConfig: config.jest,
    webpackEnhance: config.webpack || ((config) => config),
    swc: config.swc || { enabled: false }
  }
}

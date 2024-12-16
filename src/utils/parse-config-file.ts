import { Configuration, ParsedConfiguration } from '../types/configuration.type.js'

export const parseConfigFile = (config: Configuration): ParsedConfiguration => {
  return {
    outDir: config.outDir || 'dist',
    entryFiles: config.entryFiles,
    manifest: config.manifest || false,
    browserslistConfig: config.browserslist,
    jestConfig: config.jest,
    eslintConfig: config.eslint,
    webpackEnhance: config.webpack || ((config) => config),
    licenseChecker: config.licenseChecker,
    jsLoader: config.jsLoader || 'swc',
    jsTestLoader: config.jsTestLoader,
    dataUriMaxFileSize: config.dataUriMaxFileSize,
    importSource: config.importSource || 'react',
  }
}

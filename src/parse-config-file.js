export const parseConfigFile = (config) => {
  return {
    outDir: config.outDir || 'dist',
    entryFiles: config.entryFiles,
    browserslistConfig: config.browserslist,
    jestConfig: config.jest,
    webpackEnhance: config.webpack || ((config) => config)
  }
}

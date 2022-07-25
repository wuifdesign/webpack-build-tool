export const parseConfigFile = (config) => {
  return {
    outDir: config.outDir || 'dist',
    entryFiles: config.entryFiles,
    browserslistConfig: config.browserslist,
    webpackEnhance: config.webpack || ((config) => config)
  }
}

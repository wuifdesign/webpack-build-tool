import webpack from 'webpack'
import chalk from 'chalk'
import { printBuildTimeAfterBuild } from '../build-time-reporter.js'
import { printAllSizesAfterBuild, printEntrySizesAfterBuild } from '../file-size-reporter.js'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { checkErrors } from '../check-errors.js'
import { parseConfigFile } from '../parse-config-file.js'
import { enableProductionMode } from '../enable-production-mode.js'
import { getEffectiveBrowserslistConfig } from '../config/get-babel-config.js'
import { logger } from '../logger.js'

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_FILE_GZIP_SIZE = 90 * 1024

const run = (args, config) => {
  enableProductionMode()

  const { outDir, browserslistConfig } = parseConfigFile(config)
  const analyze = args.includes('--analyze')

  logger(chalk.cyan('Creating an optimized production build...'))
  logger(chalk.magenta('Browserslist Config: ' + getEffectiveBrowserslistConfig(browserslistConfig).join(', ')))
  logger()
  const compiler = webpack(getWebpackConfig({ config, analyze }))
  compiler.run((err, stats) => {
    const { error } = checkErrors(err, stats)
    if (error) {
      process.exit(1)
    }

    printBuildTimeAfterBuild(stats)

    const root = `${process.cwd()}/${outDir.replace(/^\/+/g, '')}`

    printEntrySizesAfterBuild(
      stats,
      root,
      outDir,
      WARN_AFTER_FILE_GZIP_SIZE,
      chalk.magenta('Entry File sizes after gzip:')
    )
    logger()

    printAllSizesAfterBuild(
      stats,
      root,
      outDir,
      WARN_AFTER_FILE_GZIP_SIZE,
      chalk.magenta('Chunk File sizes after gzip:')
    )
    logger()
  })
}

export default run

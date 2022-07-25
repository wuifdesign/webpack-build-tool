import webpack from 'webpack'
import chalk from 'chalk'
import { printBuildTimeAfterBuild } from '../build-time-reporter.js'
import { printAllSizesAfterBuild, printEntrySizesAfterBuild } from '../file-size-reporter.js'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { checkErrors } from '../check-errors.js'
import { parseConfigFile } from '../parse-config-file.js'
import { enableProductionMode } from '../enable-production-mode.js'

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_FILE_GZIP_SIZE = 90 * 1024

const run = (args, config) => {
  enableProductionMode()

  const { outDir } = parseConfigFile(config)
  const analyze = args.includes('--analyze')

  console.log(chalk.cyan('Creating an optimized production build...'))
  const compiler = webpack(getWebpackConfig({ config, analyze }))
  compiler.run((err, stats) => {
    const { error } = checkErrors(err, stats)
    if (error) {
      process.exit(1)
    }

    printBuildTimeAfterBuild(stats)

    printEntrySizesAfterBuild(
      stats,
      `${process.cwd()}/dist`,
      outDir,
      WARN_AFTER_FILE_GZIP_SIZE,
      chalk.magenta('Entry File sizes after gzip:')
    )
    console.log()

    printAllSizesAfterBuild(
      stats,
      `${process.cwd()}/dist`,
      outDir,
      WARN_AFTER_FILE_GZIP_SIZE,
      chalk.magenta('Chunk File sizes after gzip:')
    )
    console.log()
  })
}

export default run

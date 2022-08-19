import webpack from 'webpack'
import chalk from 'chalk'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { checkErrors } from '../check-errors.js'
import { logger } from '../logger.js'

const run = (args, config) => {
  logger(chalk.cyan('Starting the development build...'))
  const compiler = webpack(getWebpackConfig({ config }))
  compiler.watch(
    {
      aggregateTimeout: 20,
      ignored: '**/node_modules',
      poll: undefined
    },
    (err, stats) => {
      const { error } = checkErrors(err, stats)
      if (!error) {
        logger(chalk.blue('Build finished.'))
      }
    }
  )
}

export default run

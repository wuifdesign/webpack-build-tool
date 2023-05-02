import webpack from 'webpack'
import chalk from 'chalk'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { checkErrors } from '../utils/check-errors.js'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'
import { argsParser } from '../utils/args-parser.js'
import { setNodeEnv } from '../utils/set-node-env.js'

const run: ScriptFunction = (args, config) => {
  setNodeEnv('development')

  logger(chalk.cyan('Starting the development build...'))
  const { timings, noLint } = argsParser(args)
  const compiler = webpack(getWebpackConfig({ config, timings, noLint }))
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

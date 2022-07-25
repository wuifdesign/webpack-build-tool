import webpack from 'webpack'
import chalk from 'chalk'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { checkErrors } from '../check-errors.js'

const run = (args, config) => {
  console.log(chalk.cyan('Starting the development build...'))
  const compiler = webpack(getWebpackConfig({ config }))
  compiler.watch(
    {
      aggregateTimeout: 300,
      poll: undefined
    },
    (err, stats) => {
      const { error } = checkErrors(err, stats)
      if (!error) {
        console.log(chalk.cyan('Build finished.'))
      }
    }
  )
}

export default run

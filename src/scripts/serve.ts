import webpack from 'webpack'
import fs from 'node:fs'
import process from 'node:process'
import chalk from 'chalk'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import WebpackDevServer from 'webpack-dev-server'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'

const devInfoFilePath = `${process.cwd()}/dev-server-running`

const createDevServerInfoFile = () => {
  logger(chalk.magenta(`Creating file "${devInfoFilePath}"...`))
  fs.writeFileSync(devInfoFilePath, '')
}

let removed = false
const deleteDevServerInfoFile = () => {
  if (!removed) {
    removed = true
    logger(chalk.magenta(`Removing file "${devInfoFilePath}"...`))
    fs.unlinkSync(`${process.cwd()}/dev-server-running`)
  }
}

for (const event of [
  'beforeExit',
  'disconnect',
  'exit',
  'SIGINT',
  'SIGTERM',
  'SIGBREAK',
  'SIGHUP',
  'uncaughtException'
]) {
  process.on(event, deleteDevServerInfoFile)
}

const run: ScriptFunction = (args, config) => {
  logger(chalk.cyan('Starting the development server...'))

  const webpackConfig = getWebpackConfig({ config })
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(webpackConfig.devServer, compiler)
  createDevServerInfoFile()

  server.start()
}

export default run

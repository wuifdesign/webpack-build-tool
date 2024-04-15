import fs from 'node:fs'
import process from 'node:process'
// eslint-disable-next-line import/no-named-as-default
import webpack from 'webpack'
import chalk from 'chalk'
import WebpackDevServer from 'webpack-dev-server'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'
import { argsParser } from '../utils/args-parser.js'
import { setNodeEnv } from '../utils/set-node-env.js'

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
  'uncaughtException',
]) {
  process.on(event, deleteDevServerInfoFile)
}

const run: ScriptFunction = (args, config) => {
  setNodeEnv('development')

  logger(chalk.cyan('Starting the development server...'))

  const { timings, noLint } = argsParser(args)
  const webpackConfig = getWebpackConfig({ config, timings, noLint })
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(webpackConfig.devServer, compiler)
  createDevServerInfoFile()

  server.start()
}

export default run

import webpack from 'webpack'
import fs from 'node:fs'
import process from 'node:process'
import chalk from 'chalk'
import { getWebpackConfig } from '../config/get-webpack-config.js'
import WebpackDevServer from 'webpack-dev-server'

const devInfoFilePath = `${process.cwd()}/dev-server-running`

const createDevServerInfoFile = () => {
  console.log(chalk.magenta(`Creating file "${devInfoFilePath}"...`))
  fs.writeFileSync(devInfoFilePath, '')
}

let removed = false
const deleteDevServerInfoFile = () => {
  if (!removed) {
    removed = true
    console.log(chalk.magenta(`Removing file "${devInfoFilePath}"...`))
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

const run = (args, config) => {
  console.log(chalk.cyan('Starting the development server...'))

  const webpackConfig = getWebpackConfig({ config })
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(webpackConfig.devServer, compiler)
  createDevServerInfoFile()

  server.start()
}

export default run

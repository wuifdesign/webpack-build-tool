#! /usr/bin/env node

import chalk from 'chalk'
import { pathToFileURL } from 'node:url'
import { Configuration } from '../types/configuration.type.js'

process.on('unhandledRejection', (err) => {
  throw err
})

const args = process.argv.slice(2)
const scriptIndex = args.findIndex((x) => x === 'build' || x === 'eject' || x === 'start' || x === 'test')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

const config = (await import(pathToFileURL(`${process.cwd()}/webpack-build-tool-config.js`).toString()).then(
  (module) => module.default
)) as Configuration

if (!config.entryFiles) {
  console.log(chalk.red('Key "entryFiles" is missing in "webpack-build-tool-config.js'))
  process.exit(1)
}

if (['build', 'start', 'serve', 'test', 'lint', 'browserslist', 'typecheck'].includes(script)) {
  const run = await import(`../scripts/${script}.js`).then((module) => module.default)
  run(args.slice(scriptIndex + 1), config)
} else {
  console.log(`Unknown script "${script}".`)
}

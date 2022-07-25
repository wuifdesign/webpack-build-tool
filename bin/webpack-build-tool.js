#! /usr/bin/env node

import chalk from 'chalk'

process.on('unhandledRejection', (err) => {
  throw err
})

const args = process.argv.slice(2)
const scriptIndex = args.findIndex((x) => x === 'build' || x === 'eject' || x === 'start' || x === 'test')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

const config = await import(`${process.cwd()}/webpack-build-tool.js`).then((module) => module.default)

if (!config.entryFiles) {
  console.log(chalk.red('"entryFiles" is missing in "webpack-build-tool.js'))
  process.exit(1)
}

if (['build', 'start', 'test', 'lint', 'browserslist', 'typecheck'].includes(script)) {
  const run = await import(`../src/scripts/${script}.js`).then((module) => module.default)
  run(args.slice(scriptIndex + 1), config)
} else {
  console.log('Unknown script "' + script + '".')
}

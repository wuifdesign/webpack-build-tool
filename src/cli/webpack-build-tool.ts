#! /usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import chalk from 'chalk'
// eslint-disable-next-line import/default
import tsc from 'typescript'
import { Configuration } from '../types/configuration.type.js'

process.on('unhandledRejection', (err) => {
  throw err
})

const args = process.argv.slice(2)
const scriptIndex = args.findIndex((x) => x === 'build' || x === 'eject' || x === 'start' || x === 'test')
const script = scriptIndex === -1 ? args[0] : args[scriptIndex]

let configPath = path.join(process.cwd(), 'webpack-build-tool-config.js')
let cacheFolder: string | null = null

const tsConfigPath = path.join(process.cwd(), 'webpack-build-tool-config.ts')
if (fs.existsSync(tsConfigPath)) {
  const tsContent = await fs.readFileSync(tsConfigPath).toString()
  // eslint-disable-next-line import/no-named-as-default-member
  const jsContent = tsc.transpileModule(tsContent, {
    compilerOptions: {
      // eslint-disable-next-line import/no-named-as-default-member
      module: tsc.ModuleKind.ESNext,
      // eslint-disable-next-line import/no-named-as-default-member
      target: tsc.ScriptTarget.ES2017,
      strict: true,
      types: [],
    },
  }).outputText
  const jsPath = `./node_modules/.cache/webpack-build-tool/webpack-build-tool-config.mjs`
  cacheFolder = path.dirname(jsPath)
  fs.mkdirSync(cacheFolder, { recursive: true })
  fs.writeFileSync(jsPath, jsContent)
  configPath = path.join(process.cwd(), jsPath)
}

const config = (await import(pathToFileURL(configPath).toString()).then((module) => module.default)) as Configuration

if (cacheFolder) {
  await fs.rmSync(cacheFolder, { recursive: true, force: true })
}

if (!config.entryFiles) {
  // eslint-disable-next-line no-console
  console.log(chalk.red('Key "entryFiles" is missing in "webpack-build-tool-config.js'))
  process.exit(1)
}

if (['build', 'start', 'serve', 'test', 'lint', 'browserslist', 'typecheck'].includes(script)) {
  const run = await import(`../scripts/${script}.js`).then((module) => module.default)
  run(args.slice(scriptIndex + 1), config)
} else {
  // eslint-disable-next-line no-console
  console.log(`Unknown script "${script}".`)
}

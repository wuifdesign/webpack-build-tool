import url from 'node:url'
import path from 'node:path'
import chalk from 'chalk'
import { run as runJest } from 'jest-cli'
import { logger } from '../utils/logger.js'
import { parseConfigFile } from '../utils/parse-config-file.js'
import { getBabelConfig } from '../config/get-babel-config.js'
import { ScriptFunction } from '../types/script-function.type.js'
import { setNodeEnv } from '../utils/set-node-env.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const fileMock = path.join(__dirname, '../../__mocks__/file-mock.js')
const styleMock = path.join(__dirname, '../../__mocks__/style-mock.js')
const inlineStyleMock = path.join(__dirname, '../../__mocks__/inline-style-mock.js')

const run: ScriptFunction = async (args, config) => {
  setNodeEnv('test')

  const { jestConfig, jsLoader, jsTestLoader, browserslistConfig, importSource } = parseConfigFile(config)
  const loader = jsTestLoader ?? jsLoader

  const mergedConfig = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$':
        loader === 'swc'
          ? ['@swc/jest', { configFile: '.swcrc' }]
          : ['babel-jest', getBabelConfig(browserslistConfig, importSource, true)]
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': fileMock,
      '\\.(css|sass|scss)$': styleMock,
      '\\.(css|sass|scss)\\?inline$': inlineStyleMock
    },
    ...jestConfig
  }

  logger(chalk.cyan('Starting jest tests...'))
  await runJest(['(.*)\\.(spec|test)\\.(ts|tsx|js|jsx)', `--config=${JSON.stringify(mergedConfig)}`], process.cwd())
}

export default run

import chalk from 'chalk'
import { run as runJest } from 'jest-cli'
import { logger } from '../utils/logger.js'
import { parseConfigFile } from '../utils/parse-config-file.js'
import { getBabelConfig } from '../config/get-babel-config.js'
import { ScriptFunction } from '../types/script-function.type.js'
import { setNodeEnv } from '../utils/set-node-env.js'

const run: ScriptFunction = async (args, config) => {
  setNodeEnv('test')

  const { jestConfig, jsLoader, jsTestLoader } = parseConfigFile(config)
  const loader = jsTestLoader ?? jsLoader

  const mergedConfig = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
    transform: {
      '\\.[jt]sx?$': loader === 'swc' ? '@swc/jest' : ['babel-jest', getBabelConfig()]
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '../../__mocks__/file-mock.js',
      '\\.(css|sass|scss)(\\?.+)?$': '../../__mocks__/style-mock.js'
    },
    ...jestConfig
  }

  logger(chalk.cyan('Starting jest tests...'))
  await runJest(['(.*)\\.(spec|test)\\.(ts|tsx|js|jsx)', `--config=${JSON.stringify(mergedConfig)}`], process.cwd())
}

export default run

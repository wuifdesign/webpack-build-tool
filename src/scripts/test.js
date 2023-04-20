import chalk from 'chalk'
import { run as runJest } from 'jest-cli'
import { logger } from '../logger.js'
import { parseConfigFile } from '../parse-config-file.js'
import { getBabelConfig } from '../config/get-babel-config.js'

const run = async (args, config) => {
  const { jestConfig, swc } = parseConfigFile(config)

  const mergedConfig = {
    rootDir: process.cwd(),
    testEnvironment: 'jsdom',
    transform: {
      '\\.[jt]sx?$': swc.enabled ? ['@swc/jest'] : ['babel-jest', getBabelConfig()]
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '../__mocks__/file-mock.js',
      '\\.(css|sass|scss)$': '../__mocks__/style-mock.js'
    },
    ...jestConfig
  }

  logger(chalk.cyan('Starting jest tests...'))
  await runJest(['(.*)\\.(spec|test)\\.(ts|tsx|js)', `--config=${JSON.stringify(mergedConfig)}`], process.cwd())
}

export default run

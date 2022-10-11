import chalk from 'chalk'
import { ESLint } from 'eslint'
import { logger } from '../logger.js'

const run = async (args) => {
  const fix = args.includes('--fix')

  logger(chalk.cyan('Starting ESLint...'))
  const eslint = new ESLint({
    fix,
    cwd: process.cwd()
  })
  const results = await eslint.lintFiles([`**/*.{js,ts,tsx}`])
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results)

  if (resultText === '') {
    logger()
    logger(chalk.green('ESLint finished without errors/warnings.'))
  } else {
    logger(resultText)
    process.exit(1)
  }
}

export default run

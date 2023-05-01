import chalk from 'chalk'
import { ESLint } from 'eslint'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'
import { argsParser } from '../utils/args-parser.js'

const run: ScriptFunction = async (args) => {
  const { fix } = argsParser(args)

  logger(chalk.cyan('Starting ESLint...'))
  const eslint = new ESLint({
    fix,
    cwd: process.cwd()
  })
  const results = await eslint.lintFiles([`**/*.{js,ts,tsx}`])
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results) as string

  if (resultText === '') {
    logger()
    logger(chalk.green('ESLint finished without errors/warnings.'))
  } else {
    logger(resultText)
    process.exit(1)
  }
}

export default run

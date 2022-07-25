import chalk from 'chalk'
import { ESLint } from 'eslint'

const run = async (args) => {
  const fix = args.includes('--fix')

  console.log(chalk.cyan('Starting ESLint...'))
  const eslint = new ESLint({
    fix,
    cwd: process.cwd()
  })
  const results = await eslint.lintFiles([`**/*.{js,ts,tsx}`])
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(results)

  if (resultText === '') {
    console.log()
    console.log(chalk.green('ESLint finished without errors/warnings.'))
  } else {
    console.log(resultText)
  }
}

export default run

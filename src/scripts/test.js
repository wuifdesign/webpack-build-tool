import chalk from 'chalk'
import { run as runJest } from 'jest-cli'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const run = async () => {
  console.log(chalk.cyan('Starting jest tests...'))
  await runJest(['(.*)\\.(spec|test)\\.(ts|tsx|js)', `--config=${__dirname}/../config/jest-config.js`], process.cwd())
}

export default run

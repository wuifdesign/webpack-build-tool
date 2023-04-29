import { spawnSync } from 'node:child_process'
import chalk from 'chalk'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'

const run: ScriptFunction = async () => {
  const temp = spawnSync('tsc', ['--noEmit'], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  })

  if (temp.status === 0) {
    logger(chalk.green('No typing errors found in your typescript files.'))
  }

  process.exit(temp.status || 0)
}

export default run

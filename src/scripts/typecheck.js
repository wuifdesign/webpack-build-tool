import { spawnSync } from 'child_process'
import chalk from 'chalk'

const run = async () => {
  const temp = spawnSync('tsc', ['--noEmit'], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  })

  if (temp.status === 0) {
    console.log(chalk.green('No typing errors found in your typescript files.'))
  }

  process.exit(temp.status)
}

export default run

import browserslist from 'browserslist'
import chalk from 'chalk'
import { parseConfigFile } from '../utils/parse-config-file.js'
import { getEffectiveBrowserslistConfig } from '../config/get-babel-config.js'
import { setNodeEnv } from '../utils/set-node-env.js'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'

const run: ScriptFunction = async (args, config) => {
  setNodeEnv('production')

  const { browserslistConfig } = parseConfigFile(config)
  const effectiveConfig = getEffectiveBrowserslistConfig(browserslistConfig)

  logger(chalk.cyan(`Supported Browsers:`))
  logger(
    browserslist(effectiveConfig)
      .map((name) => `    ${name}`)
      .join('\n'),
  )
  logger()
  // eslint-disable-next-line import/no-named-as-default-member
  logger(chalk.magenta(`Browser Coverage: ${browserslist.coverage(browserslist(effectiveConfig)).toFixed(1)}%`))
}

export default run

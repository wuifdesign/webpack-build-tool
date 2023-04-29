import browserslist from 'browserslist'
import chalk from 'chalk'
import { parseConfigFile } from '../utils/parse-config-file.js'
import { getEffectiveBrowserslistConfig } from '../config/get-babel-config.js'
import { enableProductionMode } from '../utils/enable-production-mode.js'
import { logger } from '../utils/logger.js'
import { ScriptFunction } from '../types/script-function.type.js'

const run: ScriptFunction = async (args, config) => {
  enableProductionMode()

  const { browserslistConfig } = parseConfigFile(config)
  const effectiveConfig = getEffectiveBrowserslistConfig(browserslistConfig)

  logger(chalk.cyan(`Supported Browsers:`))
  logger(
    browserslist(effectiveConfig)
      .map((name) => '    ' + name)
      .join('\n')
  )
  logger()
  logger(chalk.magenta(`Browser Coverage: ${browserslist.coverage(browserslist(effectiveConfig)).toFixed(1)}%`))
}

export default run

import browserslist from 'browserslist'
import chalk from 'chalk'
import { parseConfigFile } from '../parse-config-file.js'
import { getEffectiveBrowserslistConfig } from '../config/get-babel-config.js'
import { enableProductionMode } from '../enable-production-mode.js'

const run = async (args, config) => {
  enableProductionMode()

  const { browserslistConfig } = parseConfigFile(config)
  const effectiveConfig = getEffectiveBrowserslistConfig(browserslistConfig)

  console.log(chalk.cyan(`Supported Browsers:`))
  console.log(
    browserslist(effectiveConfig)
      .map((name) => '    ' + name)
      .join('\n')
  )
  console.log()
  console.log(chalk.magenta(`Browser Coverage: ${browserslist.coverage(browserslist(effectiveConfig)).toFixed(1)}%`))
}

export default run

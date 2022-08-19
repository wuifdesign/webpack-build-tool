import chalk from 'chalk'
import { logger } from './logger.js'

export function checkErrors(webpackError, webpackStats) {
  if (webpackError) {
    logger(chalk.red(webpackError))
    return { error: true, warning: false }
  }

  const errors = webpackStats.toJson({ all: false, errors: true }).errors.map((err) => err.message)
  const warnings = webpackStats.toJson({ all: false, warnings: true }).warnings.map((warn) => warn.message)

  if (errors.length) {
    logger(errors.join('\n\n'))
    return { error: true, warning: false }
  }

  if (warnings.length) {
    logger(warnings.join('\n\n'))
    return { error: false, warning: true }
  }

  return { error: false, warning: false }
}

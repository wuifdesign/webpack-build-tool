import chalk from 'chalk'
import { Stats, StatsError } from 'webpack'
import { logger } from './logger.js'

const itemsToString = (errors: StatsError[], type: string): string => {
  return errors
    .map((item) => {
      let message = item.message
      if (item.moduleName && item.loc) {
        message = `${type} in ${item.moduleName}:${item.loc.split('-')[0]}\n${message}`
      }
      return message
    })
    .join('\n\n')
}

export function checkErrors(webpackError: Error | null | undefined, webpackStats: Stats | undefined) {
  if (webpackError) {
    logger(chalk.red(webpackError))
    return { error: true, warning: false }
  }

  if (!webpackStats) {
    return { error: false, warning: false }
  }

  const stats = webpackStats.toJson({ all: false, errors: true, warnings: true })
  const errors = stats.errors
  const warnings = stats.warnings

  if (errors?.length) {
    logger(chalk.red(itemsToString(errors, 'ERROR')))
    return { error: true, warning: false }
  }

  if (warnings?.length) {
    logger(chalk.yellow(itemsToString(warnings, 'WARNING')))
    return { error: false, warning: true }
  }

  return { error: false, warning: false }
}

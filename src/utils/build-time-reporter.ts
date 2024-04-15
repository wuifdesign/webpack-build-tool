import prettyMilliseconds from 'pretty-ms'
import chalk from 'chalk'
import { Stats } from 'webpack'
import { logger } from './logger.js'

// Prints the build duration after build.
export function printBuildTimeAfterBuild(webpackStats: Stats | undefined) {
  if (!webpackStats) {
    return
  }
  const { warnings, time } = ((webpackStats as any).stats || [webpackStats])[0].toJson({
    all: false,
    warnings: true,
    timings: true,
  })
  const humanTime = prettyMilliseconds(time!)

  if (warnings?.length) {
    logger(chalk.yellow(`Compiled with warnings in ${humanTime}.\n`))
  } else {
    logger(chalk.green(`Compiled successfully in ${humanTime}.\n`))
  }
}

import prettyMilliseconds from 'pretty-ms'
import chalk from 'chalk'

// Prints the build duration after build.
export function printBuildTimeAfterBuild(webpackStats) {
  const { warnings, time } = (webpackStats.stats || [webpackStats])[0].toJson({
    all: false,
    warnings: true,
    timings: true
  })
  const humanTime = prettyMilliseconds(time)

  if (warnings.length) {
    console.log(chalk.yellow(`Compiled with warnings in ${humanTime}.\n`))
  } else {
    console.log(chalk.green(`Compiled successfully in ${humanTime}.\n`))
  }
}

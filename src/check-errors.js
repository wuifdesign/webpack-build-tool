import chalk from 'chalk'

export function checkErrors(webpackError, webpackStats) {
  if (webpackError) {
    console.log(chalk.red(webpackError))
    return { error: true, warning: false }
  }

  const errors = webpackStats.toJson({ all: false, errors: true }).errors.map((err) => err.message)
  const warnings = webpackStats.toJson({ all: false, warnings: true }).warnings.map((warn) => warn.message)

  if (errors.length) {
    console.log(errors.join('\n\n'))
    return { error: true, warning: false }
  }

  if (warnings.length) {
    console.log(warnings.join('\n\n'))
    return { error: false, warning: true }
  }

  return { error: false, warning: false }
}

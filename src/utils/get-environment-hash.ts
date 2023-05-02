import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

export const getEnvironmentHash = () => {
  const NODE_ENV = process.env.NODE_ENV
  if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.')
  }

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  const dotenvFiles = [`.env.${NODE_ENV}.local`, `.env.local`, `.env.${NODE_ENV}`, `.env`]
  const swcFiles = ['.swcrc']
  const babelFiles = [
    'babel.config.json',
    'babel.config.js',
    'babel.config.cjs',
    'babel.config.mjs',
    'babel.config.cts',
    '.babelrc.json',
    '.babelrc.js',
    '.babelrc.cjs',
    '.babelrc.mjs',
    '.babelrc.cts',
    '.babelrc'
  ]
  const eslintFiles = [
    '.eslintrc',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    '.eslintignore'
  ]
  const webpackBuildToolFiles = ['webpack-build-tool-config.js', 'webpack-build-tool-config.ts']
  const npmFiles = ['package.json', 'tsconfig.json']

  const cacheHashed: Record<string, string> = {}

  for (const file of [
    ...dotenvFiles,
    ...swcFiles,
    ...babelFiles,
    ...eslintFiles,
    ...webpackBuildToolFiles,
    ...npmFiles
  ]) {
    try {
      const fileBuffer = fs.readFileSync(path.join(process.cwd(), file))
      const hashSum = createHash('sha256')
      hashSum.update(fileBuffer)
      cacheHashed[file] = hashSum.digest('hex')
    } catch (err) {}
  }

  return createHash('md5').update(JSON.stringify(cacheHashed)).digest('hex')
}

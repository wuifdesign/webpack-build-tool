import { Configuration as WebpackConfiguration } from 'webpack'
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import { Config as JestConfig } from 'jest'

export type CombinedWebpackConfig = WebpackConfiguration & { devServer: WebpackDevServerConfiguration }

export type BrowserListConfig = string[] | { production: string[]; development: string[] }

export type LicenceCheckerConfig = {
  outputLicenceFile?: boolean
  excludedLicences?: string[]
  allowedLicences?: string[]
  ignoredPackages?: string[]
}

export type Configuration = {
  entryFiles: Record<string, any>
  outDir?: string
  manifest?: boolean
  browserslist?: BrowserListConfig
  jest?: JestConfig
  webpack?: (config: CombinedWebpackConfig) => CombinedWebpackConfig
  licenseChecker?: LicenceCheckerConfig
  jsLoader?: 'swc' | 'babel'
  jsTestLoader?: 'swc' | 'babel'
  importSource?: 'react' | 'preact'
}

export type ParsedConfiguration = {
  entryFiles: Record<string, any>
  outDir: string
  manifest: boolean
  browserslistConfig?: BrowserListConfig
  jestConfig?: JestConfig
  webpackEnhance: (config: CombinedWebpackConfig) => CombinedWebpackConfig
  licenseChecker?: LicenceCheckerConfig
  jsLoader?: 'swc' | 'babel'
  jsTestLoader?: 'swc' | 'babel'
  importSource: 'react' | 'preact'
}

import path from 'node:path'
import webpack from 'webpack'
import logUpdate from 'log-update'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { getBabelConfig, getEffectiveBrowserslistConfig } from './get-babel-config.js'
import { isProduction } from '../utils/is-production.js'
import { parseConfigFile } from '../utils/parse-config-file.js'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import WebpackRemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import chalk from 'chalk'
import { config as dotEnvConfig } from 'dotenv'
import { Configuration } from '../types/configuration.type.js'

const notEmpty = <TValue>(value: TValue | null | undefined | false): value is TValue => {
  return value !== null && value !== undefined && value !== false
}

export const getWebpackConfig = ({ config, analyze }: { config: Configuration; analyze?: boolean }) => {
  const { outDir, entryFiles, browserslistConfig, webpackEnhance, swc, manifest } = parseConfigFile(config)

  return webpackEnhance({
    mode: isProduction() ? 'production' : 'development',
    entry: entryFiles,
    devtool: isProduction() ? false : 'eval-source-map',
    cache: {
      type: 'filesystem'
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx|tsx|ts)$/i,
              exclude: [/node_modules/],
              use: swc.enabled
                ? {
                    loader: 'swc-loader'
                  }
                : {
                    loader: 'babel-loader',
                    options: {
                      cacheCompression: false,
                      cacheDirectory: true,
                      ...getBabelConfig(browserslistConfig)
                    }
                  }
            },
            {
              test: /\.(sa|sc|c)ss$/i,
              resourceQuery: /inline/,
              // More information here https://webpack.js.org/guides/asset-modules/
              type: 'asset/source',
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        ['autoprefixer', { overrideBrowserslist: getEffectiveBrowserslistConfig(browserslistConfig) }]
                      ]
                    }
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(sa|sc|c)ss$/i,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: 'auto'
                  }
                },
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        ['autoprefixer', { overrideBrowserslist: getEffectiveBrowserslistConfig(browserslistConfig) }]
                      ]
                    }
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(png|jpe?g|gif|webp|svg|eot|ttf|woff|woff2)$/i,
              // More information here https://webpack.js.org/guides/asset-modules/
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 4 * 1024 // 4kb
                }
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
      emitOnErrors: false,
      splitChunks: {
        minSize: 100000
      },
      moduleIds: 'deterministic' // better long-time caching
    },
    devServer: {
      hot: false,
      client: {
        logging: 'warn', // 'log' | 'info' | 'warn' | 'error' | 'none' | 'verbose'
        overlay: {
          errors: true,
          warnings: false
        }
      },
      compress: true,
      port: 4000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(dotEnvConfig().parsed)
      }),
      !isProduction() &&
        new webpack.SourceMapDevToolPlugin({
          filename: '[name][ext].map',
          include: /\.css$/
        }),
      new ESLintWebpackPlugin({
        cache: true,
        context: process.cwd(),
        extensions: ['js', 'ts', 'jsx', 'tsx'],
        failOnError: true
      }),
      new ForkTsCheckerWebpackPlugin(),
      new WebpackRemoveEmptyScriptsPlugin({}),
      analyze && new BundleAnalyzerPlugin(),
      manifest &&
        new WebpackManifestPlugin({
          useEntryKeys: true,
          publicPath: '',
          generate: (_, files) => {
            const entryPoints: Record<string, string[]> = {}
            const allFiles: Record<string, string> = {}
            for (const file of files) {
              if (file.chunk) {
                if (Object.keys(entryFiles).includes(file.chunk.name)) {
                  let chunkFiles: string[] = []
                  for (const chunk of file.chunk.getAllInitialChunks()) {
                    chunkFiles = chunkFiles.concat(Array.from(chunk.files))
                  }
                  entryPoints[file.name] = chunkFiles
                }
              }
              allFiles[file.name] = file.path
            }
            return {
              entryPoints,
              files: allFiles
            }
          }
        }),
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          if (pathData.chunk?.name?.endsWith('.css')) {
            return '[name]'
          }
          return '[name].css'
        }
      }),
      new webpack.ProgressPlugin((percentage, message, info) => {
        if (percentage >= 1) {
          logUpdate.clear()
        } else {
          logUpdate(`${chalk.blue(`${message} (${Math.round(percentage * 100) + '%'})`)} ${chalk.dim(info)}`)
        }
      })
    ].filter(notEmpty),
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    stats: 'errors-only',
    target: ['browserslist:' + getEffectiveBrowserslistConfig(browserslistConfig).join(',')],
    output: {
      publicPath: 'auto',
      filename: (data) => {
        const fileEnding = !data.chunk?.name?.endsWith('.js') ? '.js' : ''
        if (data.chunk?.name && Object.keys(entryFiles).includes(data.chunk.name)) {
          return `[name]${fileEnding}`
        }
        return `[name].[contenthash:8]${fileEnding}`
      },
      chunkFilename: (data) => {
        return (data.chunk?.name || 'lib/vendor') + '.[contenthash:8].min.js'
      },
      assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',
      path: path.resolve(process.cwd(), outDir),
      clean: true
    }
  })
}

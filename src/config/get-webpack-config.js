import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { getBabelConfig } from './get-babel-config.js'
import { isProduction } from '../is-production.js'
import { parseConfigFile } from '../parse-config-file.js'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import WebpackRemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts'

export const getWebpackConfig = ({ config, analyze }) => {
  const { outDir, entryFiles, browserslist, webpackEnhance } = parseConfigFile(config)

  return webpackEnhance({
    mode: isProduction() ? 'production' : 'development',
    entry: entryFiles,
    devtool: isProduction() ? undefined : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: getBabelConfig(browserslist)
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            'css-loader',
            'sass-loader'
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
    plugins: [
      new ESLintWebpackPlugin({
        context: process.cwd(),
        extensions: ['js', 'ts'],
        failOnError: true
      }),
      new ForkTsCheckerWebpackPlugin(),
      new WebpackRemoveEmptyScriptsPlugin({
        enabled: isProduction()
      }),
      analyze && new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ].filter((p) => p),
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    stats: 'errors-only',
    output: {
      filename: (data) => {
        if (Object.keys(entryFiles).includes(data.chunk.name)) {
          return '[name].min.js'
        }
        return '[name].[contenthash:8].min.js'
      },
      chunkFilename: (data) => {
        return (data.chunk.name || 'lib/vendor') + '.[contenthash:8].min.js'
      },
      path: path.resolve(process.cwd(), outDir),
      clean: true
    }
  })
}

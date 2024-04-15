import fs from 'node:fs'
import path from 'node:path'
import { filesize } from 'filesize'
import stripAnsi from 'strip-ansi'
import { gzipSizeSync } from 'gzip-size'
import chalk from 'chalk'
import { MultiStats, Stats } from 'webpack'
import { logger } from './logger.js'

type Asset = { name: string; size?: number }

function canReadAsset(asset: string) {
  return (
    /\.(js|css)$/.test(asset) && !/service-worker\.js/.test(asset) && !/precache-manifest\.[0-9a-f]+\.js/.test(asset)
  )
}

function printSizes(
  webpackStats: Stats | MultiStats,
  assetsMapper: (stats: Stats) => Asset[],
  root: string,
  buildFolder: string,
  maxEntryGzipSize: number,
  infoText: string,
) {
  const stats: Stats[] = (webpackStats as any).stats || [webpackStats]
  const assets = stats
    .map((stats) => {
      const files = assetsMapper(stats)

      const data = []
      for (const value of files) {
        const fileContents = fs.readFileSync(path.join(root, value.name))
        const size = gzipSizeSync(fileContents)
        data.push({
          folder: path.join(path.basename(buildFolder), path.dirname(value.name)),
          name: path.basename(value.name),
          size: size,
          sizeLabel: filesize(size),
        })
      }

      return data
    })
    .reduce((single, all) => all.concat(single), [])
  assets.sort((a, b) => b.size - a.size)

  let showInfo = false
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map((a) => stripAnsi(a.sizeLabel.toString()).length),
  )
  if (assets.length && infoText) {
    logger(infoText)
  }
  assets.forEach((asset) => {
    const isToBig = asset.size > maxEntryGzipSize
    if (isToBig) {
      showInfo = true
    }
    let sizeLabel = asset.sizeLabel!
    const sizeLength = stripAnsi(sizeLabel.toString()).length
    if (sizeLength < longestSizeLabelLength) {
      sizeLabel += ' '.repeat(longestSizeLabelLength - sizeLength)
    }
    if (isToBig) {
      sizeLabel = chalk.yellow(sizeLabel)
    }
    logger(`    ${sizeLabel}  ${chalk.dim(asset.folder + path.sep)}${chalk.cyan(asset.name)}`)
  })

  if (showInfo) {
    logger()
    logger(
      chalk.yellow(
        `Some of the files(s) combined asset size exceeds the recommended limit (${filesize(maxEntryGzipSize, {
          base: 2,
        })}). This can impact web performance.`,
      ),
    )
  }
}

export function printAllSizesAfterBuild(
  webpackStats: Stats,
  root: string,
  buildFolder: string,
  maxEntryGzipSize: number,
  infoText: string,
) {
  printSizes(
    webpackStats,
    (stats) => {
      const assets: any[] = []
      const entryFileNames = getEntryPoints(webpackStats).map((item) => item.name)
      for (const group of Object.values(stats.toJson({ all: false, chunkGroups: true }).namedChunkGroups!)) {
        for (const asset of group.assets!) {
          if (!entryFileNames.includes(asset.name)) {
            assets.push(asset)
          }
        }
      }
      return assets.filter((asset) => canReadAsset(asset.name))
    },
    root,
    buildFolder,
    maxEntryGzipSize,
    infoText,
  )
}

const getEntryPoints = (stats: Stats) => {
  const assets: Asset[] = []
  for (const group of Object.values(stats.toJson({ all: false, entrypoints: true }).entrypoints!)) {
    for (const asset of group.assets!) {
      assets.push(asset)
    }
  }
  return assets.filter((asset) => canReadAsset(asset.name))
}

export function printEntrySizesAfterBuild(
  webpackStats: Stats,
  root: string,
  buildFolder: string,
  maxEntryGzipSize: number,
  infoText: string,
) {
  printSizes(webpackStats, (stats) => getEntryPoints(stats), root, buildFolder, maxEntryGzipSize, infoText)
}

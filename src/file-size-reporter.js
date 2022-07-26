import fs from 'fs'
import path from 'path'
import filesize from 'filesize'
import stripAnsi from 'strip-ansi'
import { gzipSizeSync } from 'gzip-size'
import chalk from 'chalk'
import { logger } from './logger.js'

function canReadAsset(asset) {
  return (
    /\.(js|css)$/.test(asset) && !/service-worker\.js/.test(asset) && !/precache-manifest\.[0-9a-f]+\.js/.test(asset)
  )
}

function printSizes(webpackStats, assetsMapper, root, buildFolder, maxEntryGzipSize, infoText) {
  const assets = (webpackStats.stats || [webpackStats])
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
          sizeLabel: filesize(size)
        })
      }

      return data
    })
    .reduce((single, all) => all.concat(single), [])
  assets.sort((a, b) => b.size - a.size)

  let showInfo = false
  const longestSizeLabelLength = Math.max.apply(
    null,
    assets.map((a) => stripAnsi(a.sizeLabel).length)
  )
  if (assets.length && infoText) {
    logger(infoText)
  }
  assets.forEach((asset) => {
    const isToBig = asset.size > maxEntryGzipSize
    if (isToBig) {
      showInfo = true
    }
    let sizeLabel = asset.sizeLabel
    const sizeLength = stripAnsi(sizeLabel).length
    if (sizeLength < longestSizeLabelLength) {
      sizeLabel += ' '.repeat(longestSizeLabelLength - sizeLength)
    }
    if (isToBig) {
      sizeLabel = chalk.yellow(sizeLabel)
    }
    logger('    ' + sizeLabel + '  ' + chalk.dim(asset.folder + path.sep) + chalk.cyan(asset.name))
  })

  if (showInfo) {
    logger()
    logger(
      chalk.yellow(
        `Some of the files(s) combined asset size exceeds the recommended limit (${filesize(maxEntryGzipSize, {
          base: 2
        })}). This can impact web performance.`
      )
    )
  }
}

export function printAllSizesAfterBuild(webpackStats, root, buildFolder, maxEntryGzipSize, infoText) {
  printSizes(
    webpackStats,
    (stats) => {
      const assets = []
      const entryFileNames = getEntryPoints(webpackStats).map((item) => item.name)
      for (const group of Object.values(stats.toJson({ all: false, chunkGroups: true }).namedChunkGroups)) {
        for (const asset of group.assets) {
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
    infoText
  )
}

const getEntryPoints = (stats) => {
  const assets = []
  for (const group of Object.values(stats.toJson({ all: false, entrypoints: true }).entrypoints)) {
    for (const asset of group.assets) {
      assets.push(asset)
    }
  }
  return assets.filter((asset) => canReadAsset(asset.name))
}

export function printEntrySizesAfterBuild(webpackStats, root, buildFolder, maxEntryGzipSize, infoText) {
  printSizes(webpackStats, (stats) => getEntryPoints(stats), root, buildFolder, maxEntryGzipSize, infoText)
}

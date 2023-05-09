import { Configuration } from 'webpack-build-tool'

const config: Configuration = {
  manifest: true,
  entryFiles: {
    'test/main.min': '/src/main.ts',
    'test/demo-style.min': '/src/demo.css',
    'test/style.min': '/src/style.scss'
  },
  jest: {
    transformIgnorePatterns: ['node_modules/(?!preact)'],
    testPathIgnorePatterns: ['/node_modules/']
  },
  jsLoader: 'swc',
  jsTestLoader: 'swc',
  importSource: 'preact',
  webpack: (config) => {
    return config
  }
}

export default config

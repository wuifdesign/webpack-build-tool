import { Configuration } from 'webpack-build-tool'

const config: Configuration = {
  manifest: true,
  entryFiles: {
    'test/main.min': '/src/main.tsx',
    'test/demo-style.min': '/src/demo.css',
    'test/style.min': '/src/style.scss'
  },
  jest: {
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(preact|@testing-library)/)']
  },
  jsLoader: 'swc',
  // jsTestLoader: 'swc',
  // importSource: 'preact',
  webpack: (config) => {
    return config
  }
}

export default config

import { Configuration } from 'webpack-build-tool'

const config: Configuration = {
  manifest: true,
  entryFiles: {
    'test/main.[contenthash:8].min': '/src/main.tsx',
    'test/demo-style.[contenthash:8].min': '/src/demo.css',
    'test/style.min': '/src/style.scss',
  },
  jest: {
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(preact|@testing-library)/)'],
  },
  jsLoader: 'swc',
  // jsTestLoader: 'swc',
  // importSource: 'preact',
  licenseChecker: {
    allowedLicences: ['MIT', 'ISC'],
  },
  webpack: (config) => {
    return config
  },
}

export default config

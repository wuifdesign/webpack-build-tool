/** @type { import('../global.d.ts').Configuration } */
const config: Configuration = {
  manifest: true,
  entryFiles: {
    'test/main.min': '/src/main.ts',
    'test/demo-style.min': '/src/demo.css',
    'test/style.min': '/src/style.scss'
  },
  jest: {
    testPathIgnorePatterns: ['/node_modules/']
  },
  swc: {
    // enabled: true
  },
  webpack: (config) => {
    return config
  }
}

export default config

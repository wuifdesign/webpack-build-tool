const config = {
  entryFiles: {
    'test/main.min': '/example/main.ts',
    'test/demo-style.min': '/example/demo.css',
    'test/style.min': '/example/style.scss'
  },
  jest: {
    testPathIgnorePatterns: ['/node_modules/']
  }
}

export default config

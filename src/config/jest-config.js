import { getBabelConfig } from './get-babel-config.js'

const jestConfig = {
  rootDir: process.cwd(),
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['babel-jest', getBabelConfig()]
  }
}

export default jestConfig

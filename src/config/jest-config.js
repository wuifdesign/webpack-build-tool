import { getBabelConfig } from './get-babel-config.js'

const jestConfig = {
  rootDir: process.cwd(),
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['babel-jest', getBabelConfig()]
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '../__mocks__/file-mock.js',
    '\\.(css|sass|scss)$': '../__mocks__/style-mock.js'
  }
}

export default jestConfig

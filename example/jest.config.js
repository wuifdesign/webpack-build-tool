/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(preact|@testing-library)/)'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../__mocks__/file-mock.js',
    '\\.(css|sass|scss)(\\?.+)?$': '<rootDir>/../__mocks__/style-mock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': '@swc/jest',
  },
}

module.exports = config

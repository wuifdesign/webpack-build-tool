# Webpack Build Tool

This package is used to build Typescript, Javascript and CSS/SCSS files and
bundle them using [webpack](https://webpack.js.org/).

## Installation

```
npm install webpack-build-tool -D
```

## Usage

Create a `webpack-build-tool.js` in the same directory as the `package.json`.

```js
// webpack-build-tool.js

module.exports = {
  // outDir: 'dist', // to specify a different output directory
  // webpack: (config) => config, // to enhance/change webpack config
  // browserslist: { // if you want to override the default browserlists
  //   production: ['>0.2%', 'not dead', 'not op_mini all', 'ie >= 11'],
  //   development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
  // },
  entryFiles: {
    'folder/main': './src/main.ts',
  }
}
```

Then update your `package.json` and add the package and new scripts:

```
// package.json

{
  ...,
  "scripts": {
    "start": "webpack-build-tool start",
    "serve": "webpack-build-tool serve",
    "build": "webpack-build-tool build",
    "build-with-analyze": "webpack-build-tool build --analyze",
    "lint": "webpack-build-tool lint",
    "lint-with-fix": "webpack-build-tool lint --fix",
    "test": "webpack-build-tool test",
    "typecheck": "webpack-build-tool typecheck",
    "browserslist": "webpack-build-tool browserslist"
  }
}
```

### Using webpack-dev-server

When running the `webpack-build-tool serve` command a webserver will be started at `http://localhost:4000` and a file
`dev-server-running` in the root directory will be created. This file can be used to dynamically 
load the files from the localhost server.

### Using Typescript

Create `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "types": [
      "jest",
      "node"
    ],
    "target": "es2015",
    "moduleResolution": "node",
    "noEmit": true,
    "strictNullChecks": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "noImplicitAny": true
  }
}
```

### Building SASS/SCSS/CSS Files

No additional configuration needed, just add them to your `entryFiles`.

```js
// webpack-build-tool.js

module.exports = {
  // ...
  entryFiles: {
    'folder/main.min': './src/main.ts',
    'folder/styles.min': './src/styles.scss',
  }
}
```

### Using ESLint

Create the following files in the root of your project. 

The following config includes `eslint-config-wuif` which can be installed using `npm i eslint-config-wuif -D`,
but you can also use your own eslint config.

```
// .eslintignore

dist
```

```
// .eslintrc

{
  "root": true,
  "extends": [
    "eslint-config-wuif"
  ],
  "settings": {
    "react": {
      "version": "18"
    }
  }
}

```

### Using Jest

Just create test files using following naming: `... .(spec|test).(ts|tsx|js)`

```
// src/demo.spec.ts

import { testFunction } from './main'

describe('testFunction', () => {
  test('should return value', async () => {
    expect(testFunction()).toBe(123)
  })
})
```

#### Using jest in IDE

You need to add the following two files.

```js
// jest.config.js

const jestConfig = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': ['babel-jest']
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'webpack-build-tool/__mocks__/file-mock.js',
    '\\.(css|sass|scss)$': 'webpack-build-tool/__mocks__/style-mock.js'
  }
}
```

```
// .babelrc

{
  "presets": ["@babel/preset-typescript"]
}
```

### Running Type Checks for Typescript Files without Building

If you want to run type checks but not build files you can use the `webpack-build-tool typecheck` command.
This is faster than doing so during build.

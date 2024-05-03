# Webpack Build Tool

This package is used to build Typescript, Javascript and CSS/SCSS files and
bundle them using [webpack](https://webpack.js.org/). Uses https://swc.rs/docs/usage/swc-loader for js/ts files.

## Installation

```
npm install webpack-build-tool -D
```

## Usage

Create a `webpack-build-tool-config.js` or `webpack-build-tool-config.ts`  in the same directory as the `package.json`.

```ts
// webpack-build-tool-config.ts

import { Configuration } from 'webpack-build-tool'

const config: Configuration = {
  entryFiles: {
    'folder/main': './src/main.ts',
  },
  // outDir: 'dist', // to specify a different output directory
  // manifest: true, // to generate a minifest.json file
  // webpack: (config) => config, // to enhance/change webpack config
  // browserslist: { // if you want to override the default browserlists
  //   production: ['>0.2%', 'not dead', 'not op_mini all', 'ie >= 11'],
  //   development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
  // },
  // jest: {
  //   testPathIgnorePatterns: ['/node_modules/']
  // },
  // licenseChecker: {
  //   outputLicenceFile: true
  //   excludedLicences: []
  //   allowedLicences: ['Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'MIT']
  //   ignoredPackages: []
  // },
  // jsLoader: 'swc' // 'swc' | 'babel'
}

export default config
```

```js
// webpack-build-tool-config.js

/** @type { import('webpack-build-tool').Configuration } */
module.exports = {
  entryFiles: {
    'folder/main': './src/main.ts',
  },
  // outDir: 'dist', // to specify a different output directory
  // manifest: true, // to generate a minifest.json file
  // webpack: (config) => config, // to enhance/change webpack config
  // browserslist: { // if you want to override the default browserlists
  //   production: ['>0.2%', 'not dead', 'not op_mini all', 'ie >= 11'],
  //   development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version']
  // },
  // jest: {
  //   testPathIgnorePatterns: ['/node_modules/']
  // },
  // licenseChecker: {
  //   outputLicenceFile: true
  //   excludedLicences: []
  //   allowedLicences: ['Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'MIT']
  //   ignoredPackages: []
  // },
  // jsLoader: 'swc', // 'swc' | 'babel'
  // jsTestLoader: 'swc', // 'swc' | 'babel'
  // importSource: 'react' // 'react' | 'preact'
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
    "build-no-lint": "webpack-build-tool build --no-lint",
    "lint": "webpack-build-tool lint",
    "lint-with-fix": "webpack-build-tool lint --fix",
    "test": "webpack-build-tool test",
    "typecheck": "webpack-build-tool typecheck",
    "browserslist": "webpack-build-tool browserslist"
  }
}
```

Using `--no-lint` will improve build time.

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

### Using SWC and React/Preact

Create `.swcrc` file:

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "importSource": "react"
      }
    }
  }
}

```

### Building SASS/SCSS/CSS Files

No additional configuration needed, just add them to your `entryFiles`.

```js
// webpack-build-tool-config.js

/** @type { import('webpack-build-tool').Configuration } */
module.exports = {
  // ...
  entryFiles: {
    'folder/main.min': './src/main.ts',
    'folder/styles.min': './src/styles.scss',
  }
}
```

### Inline Import for Styles

If you need to import styles inline you may use the `?inline` query params on imports.

```js
import styles from './styles.css?inline'
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

Just create test files using following naming: `... .(spec|test).(ts|tsx|js|jsx)`

```
// src/demo.spec.ts

import { testFunction } from './main'

describe('testFunction', () => {
  test('should return value', async () => {
    expect(testFunction()).toBe('testValue')
  })
})
```

### Using .env

You can create a `.env` file in your project root and this can be used in any file

```
// .env

API_ROOT=https://myurl.com
```

```
// src/index.ts

console.log(process.env.API_ROOT)
```

#### Using @testing-library/preact

```js
// webpack-build-tool-config.js

/** @type { import('webpack-build-tool').Configuration } */
module.exports = {
  // ...
  jest: {
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(preact|@testing-library)/)'],
  }
}
```

#### Using jest in IDE

You need to add the following two files.

```js
// jest.config.js

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['@swc/jest'] // or ['babel-jest'] if using babel
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'webpack-build-tool/__mocks__/file-mock.js',
    '\\.(css|sass|scss)$': 'webpack-build-tool/__mocks__/style-mock.js',
    '\\.(css|sass|scss)\\?inline$': 'webpack-build-tool/__mocks__/inline-style-mock.js'
  }
}

module.exports = config
```

### Running Type Checks for Typescript Files without Building

If you want to run type checks but not build files you can use the `webpack-build-tool typecheck` command.
This is faster than doing so during build.


### Using Babel instead of SWC

```js
// webpack-build-tool-config.js

/** @type { import('webpack-build-tool').Configuration } */
module.exports = {
  // ...
  jsLoader: 'babel'
}
```

For your IDE you may need to add a `.babelrc`:

```
// .babelrc

{
  "presets": ["@babel/preset-react", "@babel/preset-typescript"]
}
```

### Show Timings of Webpack and ESLint

If you want to inspect what slows down your webpack build you activate the
[Speed Measure Webpack Plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin) by adding
`--timings` flag.

```
// package.json

{
  ...,
  "scripts": {
    "start": "webpack-build-tool build --timings",
  }
}
```

For ESLint timing you need to add `TIMING=1` environment variable. 
(https://eslint.org/docs/latest/extend/custom-rules#profile-rule-performance)

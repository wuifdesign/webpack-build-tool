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
    'folder/main': './src/main.ts',
    'folder/styles': './src/styles.scss',
  }
}
```

### Using ESLint

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

### Running Type Checks for Typescript Files without Building

If you want to run type checks but not build files you can use the `webpack-build-tool typecheck` command.
This is faster than doing so during build.

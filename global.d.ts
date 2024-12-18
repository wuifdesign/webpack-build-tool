declare module 'webpack-build-tool' {
  export interface Configuration {
    entryFiles: Record<string, any>
    outDir?: string
    manifest?: boolean
    browserslist?: string[] | { production: string[]; development: string[] }
    jest?: import('jest').Config
    eslint?: import('eslint-webpack-plugin').Options
    webpack?: (
      config: import('webpack').Configuration & { devServer: import('webpack-dev-server').Configuration },
    ) => import('webpack').Configuration & { devServer: import('webpack-dev-server').Configuration }
    licenseChecker?: {
      outputLicenceFile?: boolean
      excludedLicences?: string[]
      allowedLicences?: string[]
      ignoredPackages?: string[]
    }
    dataUriMaxFileSize?: number
    jsLoader?: 'swc' | 'babel'
    jsTestLoader?: 'swc' | 'babel'
    importSource?: 'react' | 'preact'
  }
}

declare module '*.css' {
  const value: string
  export = value
}

declare module '*.sass' {
  const value: string
  export = value
}

declare module '*.scss' {
  const value: string
  export = value
}

declare module '*.png' {
  const value: string
  export = value
}

declare module '*.jpg' {
  const value: string
  export = value
}

declare module '*.jpeg' {
  const value: string
  export = value
}

declare module '*.gif' {
  const value: string
  export = value
}

declare module '*.webp' {
  const value: string
  export = value
}

declare module '*.svg' {
  const value: string
  export = value
}

declare module '*.eot' {
  const value: string
  export = value
}

declare module '*.ttf' {
  const value: string
  export = value
}

declare module '*.woff' {
  const value: string
  export = value
}

declare module '*.woff2' {
  const value: string
  export = value
}

declare module '*?inline' {
  const value: string
  export = value
}

interface Configuration {
  entryFiles: Record<string, any>
  outDir?: string
  manifest?: boolean
  browserslist?: string[] | { production: string[]; development: string[] }
  jest?: import('jest').Config
  webpack?: (
    config: import('webpack').Configuration & { devServer: import('webpack-dev-server').Configuration }
  ) => import('webpack').Configuration & { devServer: import('webpack-dev-server').Configuration }
  swc?: { enabled?: boolean }
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.eot' {
  const src: string
  export default src
}

declare module '*.ttf' {
  const value: any
  export = value
}

declare module '*.woff' {
  const src: string
  export default src
}

declare module '*.woff2' {
  const src: string
  export default src
}

declare module '*?inline' {
  const src: string
  export default src
}

export const setNodeEnv = (mode: 'production' | 'development' | 'test') => {
  process.env.NODE_ENV = mode
}

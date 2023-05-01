export function argsParser(args: string[]) {
  return {
    fix: args.includes('--fix'),
    analyze: args.includes('--analyze'),
    noLint: args.includes('--no-lint'),
    timings: args.includes('--timings')
  }
}

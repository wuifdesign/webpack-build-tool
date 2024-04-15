import logUpdate from 'log-update'

export function logger(value: string = '') {
  logUpdate.clear()
  // eslint-disable-next-line no-console
  console.log(value)
}

import logUpdate from 'log-update'

export function logger(value: string = '') {
  logUpdate.clear()
  console.log(value)
}

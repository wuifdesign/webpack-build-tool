import logUpdate from 'log-update'

export function logger(value = '') {
  logUpdate.clear()
  console.log(value)
}

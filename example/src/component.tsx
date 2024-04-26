import { FunctionComponent } from 'preact'
import { useCallback } from 'preact/compat'

export const TextComponent: FunctionComponent = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = useCallback(() => null, [])
  return <div>{children}</div>
}

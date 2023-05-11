import { FunctionComponent } from 'preact'
import { useCallback } from 'preact/compat'

export const TextComponent: FunctionComponent = ({ children }) => {
  const a = useCallback(() => null, [])
  return <div>{children}</div>
}

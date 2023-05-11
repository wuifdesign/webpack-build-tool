import { FunctionComponent, render } from 'preact'
import { useCallback } from 'preact/compat'

export const TextComponent: FunctionComponent = ({ children }) => {
  const a = useCallback(() => null)
  return <>{children}:Content</>
}

render(<TextComponent />, document.getElementById('root')!)

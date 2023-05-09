import { render, screen } from '@testing-library/preact'
import '@testing-library/jest-dom'
import { TextComponent } from './component'

test('loads and displays greeting', async () => {
  render(<TextComponent>Content</TextComponent>)
  expect(await screen.findByText('Content')).toBeInTheDocument()
})

import { render, screen } from '@testing-library/preact'
import { TextComponent } from './component'

describe('TextComponent', () => {
  test('loads and displays greeting', async () => {
    render(<TextComponent>Content</TextComponent>)
    expect(await screen.findByText('Content')).toBeDefined()
  })

  test('loads and displays greeting 2', async () => {
    render(<TextComponent>Content</TextComponent>)
    expect(await screen.findByText('Content')).toBeDefined()
  })
})

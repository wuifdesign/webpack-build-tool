import { render, screen } from '@testing-library/react'
import { TextComponent } from './component'

describe('TextComponent', () => {
  test('loads and displays greeting', async () => {
    render(<TextComponent>Content</TextComponent>)
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  test('loads and displays greeting 2', async () => {
    render(<TextComponent>Content</TextComponent>)
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })
})

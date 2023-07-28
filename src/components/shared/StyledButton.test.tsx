import { render, screen } from '@testing-library/react'
import StyledButton from './StyledButton'

test('supports text content', () => {
  render(<StyledButton>Sup</StyledButton>)
  expect(screen.getByRole('button')).toHaveTextContent('Sup')
})
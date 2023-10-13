import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('app renders successfully', () => {
  render(<App />)
  screen.getByText(/Welcome to a treasure trove of stories that never runs out!/i)
})

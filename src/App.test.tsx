import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('app renders successfully', () => {
  render(<App />)
  screen.getByText(/welcome to storysprout/i)
})

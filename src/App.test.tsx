import React from 'react'
import mockAxios from 'jest-mock-axios'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  // beforeEach(() => {
  //   mockAxios.mockResponseFor(
  //     { url: '/api/v1/health', method: 'GET' },
  //     { data: { message: 'API is healthy' } }
  //   )
  // })
  //
  // afterEach(() => {
  //   mockAxios.reset()
  // })

  test('app renders successfully', () => {
    render(<App />)
    screen.getByText(/Welcome to a treasure trove of stories that never runs out!/i)
  })
})

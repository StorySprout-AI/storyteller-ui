import React from 'react'
import mockAxios from 'jest-mock-axios'
import { render, screen, waitFor } from 'test/utils'
import Feature from './Feature'

// Fixing the "not wrapped in act(...)" warning: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
describe('<Feature />', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  test('renders when flag is enabled', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__hello', state: 'on' }] } })
    render(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    await screen.findByText('Hello')
  })

  test('does not render when flag is disabled', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [{ key: 'feat__hello', state: 'off' }] } })
    render(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })

  test('does not render when flag is not defined', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: { features: [] } })
    render(<Feature flag="feat__hello">Hello</Feature>)
    await waitFor(() => mockAxios.get)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Hello')).not.toBeInTheDocument()
  })
})

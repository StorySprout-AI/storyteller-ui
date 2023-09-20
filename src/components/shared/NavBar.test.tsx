import React from 'react'
import { render, screen, fireEvent } from 'test/utils'
import NavBar from './NavBar'

describe('NavBar', () => {
  const mockHandleLogout = jest.fn()

  test('app title', () => {
    render(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/welcome to storysprout/i)
  })

  xtest('home link', () => {
    render(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/home/i)
  })

  xtest('about link', () => {
    render(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/about/i)
  })

  test('logout button', () => {
    render(<NavBar handleLogout={mockHandleLogout} />)
    fireEvent.click(screen.getByText('Logout'))
    expect(mockHandleLogout).toHaveBeenCalled()
  })
})

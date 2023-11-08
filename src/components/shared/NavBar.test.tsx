import React from 'react'
import { screen, fireEvent, renderInMemoryRouter } from 'test/utils'
import NavBar from './NavBar'

describe('NavBar', () => {
  const mockHandleLogout = jest.fn()

  test('app title', () => {
    renderInMemoryRouter(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/welcome to storysprout/i)
  })

  xtest('home link', () => {
    renderInMemoryRouter(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/home/i)
  })

  xtest('about link', () => {
    renderInMemoryRouter(<NavBar handleLogout={mockHandleLogout} />)
    screen.getByText(/about/i)
  })

  test('logout button', () => {
    renderInMemoryRouter(<NavBar handleLogout={mockHandleLogout} />)
    fireEvent.click(screen.getByText('Logout'))
    expect(mockHandleLogout).toHaveBeenCalled()
  })
})

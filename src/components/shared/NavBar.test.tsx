import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
  const mockHandleLogout = jest.fn()

  test('app title', () => {
    render(<NavBar handleLogout={mockHandleLogout} />);
    screen.getByText(/welcome to storysprout/i);
  })

  test('home link', () => {
    render(<NavBar handleLogout={mockHandleLogout} />);
    screen.getByText(/home/i);
  })

  test('about link', () => {
    render(<NavBar handleLogout={mockHandleLogout} />);
    screen.getByText(/about/i);
  })


  test('logout button', () => {
    render(<NavBar handleLogout={mockHandleLogout} />);
    fireEvent.click(screen.getByText('Logout'))
    expect(mockHandleLogout).toHaveBeenCalled()
  })
})


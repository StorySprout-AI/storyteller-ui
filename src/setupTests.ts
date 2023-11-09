// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock window.location and set defaults
Object.defineProperty(global.window, 'location', {
  value: {
    ...global.window.location,
    get host() {
      return 'storysprout.test'
    },
    get hostname() {
      return this.host
    },
    get pathname() {
      return '/'
    },
    get href() {
      return `${this.origin}${this.pathname}${this.search}`
    },
    get origin() {
      return `${this.protocol}//${this.host}`
    },
    get search() {
      return new URLSearchParams('u=User;99')
    },
    writeable: true
  }
})

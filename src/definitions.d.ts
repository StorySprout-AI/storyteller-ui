import { AppleID } from 'react-apple-login'

declare global {
  interface Window {
    AppleID: AppleID
  }
}

export {}

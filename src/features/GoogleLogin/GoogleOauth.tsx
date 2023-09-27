import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

interface GoogleOauthProps {
  onSuccess: (response: object) => void
  onError: () => void
}

const GoogleOauth: React.FC<GoogleOauthProps> = ({ onSuccess, onError }) => {
  return <GoogleLogin width={180} onSuccess={onSuccess} onError={onError} text="continue_with" />
}

export default GoogleOauth

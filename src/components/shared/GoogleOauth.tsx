import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

interface GoogleOauthProps {
  onSuccess: (response: object) => void
  onError: () => void
}

const GoogleOauth: React.FC<GoogleOauthProps> = ({ onSuccess, onError }) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onError} />
}

export default GoogleOauth

import React from 'react'

import GoogleOauth from './GoogleOauth'
import axios from 'axios'
import CryptoJS from 'crypto-js'

export default function GoogleLogin() {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Google login successful')

    const data = {
      credential: credentialResponse.credential,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    }
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/oauth/google`, data)
      .then((res) => {
        const token = res.data.access_token
        const user = res.data.user
        const encryptedToken = CryptoJS.AES.encrypt(token, process.env.REACT_APP_ENCRYPTION_KEY as string).toString()
        const encryptedRefreshToken = CryptoJS.AES.encrypt(
          res.data.refresh_token,
          process.env.REACT_APP_ENCRYPTION_KEY as string
        ).toString()
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          process.env.REACT_APP_ENCRYPTION_KEY as string
        ).toString()

        localStorage.setItem('authProvider', 'google')
        localStorage.setItem('refreshToken', encryptedRefreshToken)
        localStorage.setItem('token', encryptedToken)
        localStorage.setItem('user', encryptedUser)

        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLoginError = () => {
    console.log('Google login failed')
    // Add your logic here for handling login errors
  }

  return (
    <GoogleOauth 
      onSuccess={handleLoginSuccess} 
      onError={handleLoginError} />
  )
}

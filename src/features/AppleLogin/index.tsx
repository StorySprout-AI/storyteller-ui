import React, { useCallback } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import AppleOauth from './AppleOauth'
import { SignInErrorI, SignInResponseI } from './types'

export default function AppleLogin({ ...rest }) {
  const redirectURI = process.env.REACT_APP_APPLE_REDIRECT_URI as string

  const onSuccess = useCallback(async ({ detail }: CustomEvent<SignInResponseI>) => {
    console.debug({ detail })
    const { code, id_token } = detail.authorization

    const data = {
      id_token,
      code,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      redirect_uri: redirectURI
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/oauth/apple`, data)
      const { access_token: accessToken, refresh_token: refreshToken, user } = res.data
      console.debug({ accessToken, refreshToken, user })
      const encryptedToken = CryptoJS.AES.encrypt(
        accessToken,
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      const encryptedRefreshToken = CryptoJS.AES.encrypt(
        refreshToken,
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()

      localStorage.setItem('authProvider', 'apple')
      localStorage.setItem('refreshToken', encryptedRefreshToken)
      localStorage.setItem('token', encryptedToken)
      localStorage.setItem('user', encryptedUser)
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onError = useCallback(({ detail }: CustomEvent<SignInErrorI>) => {
    console.error({ detail })
  }, [])

  return (
    <AppleOauth
      clientId="app.storysprout.web.auth"
      redirectURI={redirectURI}
      onSuccess={onSuccess}
      onError={onError}
      {...rest}
    />
  )
}

import React from 'react'
import jwt_decode from 'jwt-decode'
import tokenizer from 'lib/tokenization'
import axios from 'lib/axios'
import useTokenHelpers from './useTokenHelpers'
import { User } from 'lib/types'

export default function useAccessToken() {
  const tokenHelpers = useTokenHelpers()
  const [loading, setLoading] = React.useState(false)
  const [accessToken, setAccessToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [tokenizedUser, setTokenizedUser] = React.useState<User | null>(null)

  const refresh = React.useCallback(async () => {
    // Retrieve the refresh token from localStorage
    const currentEncryptedRefreshToken = localStorage.getItem('refreshToken')

    try {
      setLoading(true)
      if (!currentEncryptedRefreshToken) throw new Error('No refresh token found')
      const refreshToken = tokenizer.decrypt(currentEncryptedRefreshToken as string)
      const response = await axios.post('/oauth/token', {
        headers: { 'X-Skip-Authorization-Header': 'yes' },
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      })
      const user = jwt_decode(response.data.access_token) as User
      console.debug('Response @useAccessToken', { response })

      // Set access token to state
      setAccessToken(response.data.access_token)
      // Set refresh token to state
      setRefreshToken(response.data.refresh_token)
      // Set tokenized user to state
      setTokenizedUser(user)

      // Encrypt and store the new token in localStorage
      const encryptedToken = tokenizer.encrypt(response.data.access_token)
      localStorage.setItem('token', encryptedToken)

      // Encrypt and Store the new refresh token in localStorage
      const encryptedRefreshToken = tokenizer.encrypt(response.data.refresh_token)
      localStorage.setItem('refreshToken', encryptedRefreshToken)

      // Encrypt and store the user in localStorage
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      localStorage.setItem('user', encryptedUser)
    } catch (error) {
      tokenHelpers.clearCredentials()
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { loading, accessToken, refreshToken, tokenizedUser, refresh }
}

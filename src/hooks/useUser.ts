import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

type User = {
  name: string
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Remove the token and user from localStorage
  const clearCredentials = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // TODO: break down as useRefreshAccessToken hook
  const refreshAccessToken = async () => {
    // Retrieve the refresh token from localStorage
    const encrypteToken = localStorage.getItem('refreshToken')
    const token = CryptoJS.AES.decrypt(
      encrypteToken as string,
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString(CryptoJS.enc.Utf8)

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/oauth/token`, {
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      })
      // Encrypt and store the new token in localStorage
      const encryptedToken = CryptoJS.AES.encrypt(
        response.data.access_token,
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      localStorage.setItem('token', encryptedToken)

      // Encrypt and Store the new refresh token in localStorage
      const encryptedRefreshToken = CryptoJS.AES.encrypt(
        response.data.refresh_token,
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      localStorage.setItem('refreshToken', encryptedRefreshToken)

      // Encrypt and store the user in localStorage
      const user = jwt_decode(response.data.access_token)
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString()
      localStorage.setItem('user', encryptedUser)

      // Set the user and login status
      setUser(encryptedUser as unknown as User)
      setIsLoggedIn(true)
    } catch (error) {
      // No token found, clear user and login status
      setUser(null)
      setIsLoggedIn(false)
      clearCredentials()
    }
  }

  // TODO: break down as function in useTokenHelpers hook
  // Helper function to check if the token is valid
  const isTokenValid = (token: string) => {
    // Check if token is not expired
    const decodedPayload = jwt_decode(token) as { exp: number }

    if (decodedPayload.exp < Date.now() / 1000) {
      // Check if there is a refresh token in localStorage
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        /**
         * TODO: look into the effect of calling isTokenValid in a synchronous context
         *   with async refreshAccessToken implemented here
         */
        // Refresh the access token
        refreshAccessToken()

        return true
      } else {
        return false
      }
    }

    // Token is valid
    return true
  }

  useEffect(() => {
    // Retrieve the encrypted token from localStorage
    const encryptedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (encryptedToken) {
      // Decrypt the token using the encryption key
      const decryptedToken = CryptoJS.AES.decrypt(
        encryptedToken,
        process.env.REACT_APP_ENCRYPTION_KEY as string
      ).toString(CryptoJS.enc.Utf8)

      // Check if the decrypted token is valid (e.g., not expired)
      if (isTokenValid(decryptedToken)) {
        // Token is valid, set the user and login status
        const decryptedUser = CryptoJS.AES.decrypt(
          storedUser as string,
          process.env.REACT_APP_ENCRYPTION_KEY as string
        ).toString(CryptoJS.enc.Utf8)

        setUser(JSON.parse(decryptedUser))
        setIsLoggedIn(true)
      } else {
        // Token is expired or invalid, clear user and login status
        setUser(null)
        setIsLoggedIn(false)
        clearCredentials()
      }
    } else {
      // No token found, try refreshing the token
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        refreshAccessToken()
      }

      // No token found, clear user and login status
      setUser(null)
      setIsLoggedIn(false)
      clearCredentials()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, isLoggedIn }
}

export default useUser // Export the hook

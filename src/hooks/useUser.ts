import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const useUser = () => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      if (isTokenValid(decryptedToken, storedUser)) {
        // Token is valid, set the user and login status
        const user = storedUser ? JSON.parse(storedUser) : null

        setUser(user)
        setIsLoggedIn(true)
      } else {
        // Token is expired or invalid, clear user and login status
        setUser(null)
        setIsLoggedIn(false)

        // Remove the token and user from localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } else {
      // No token found, try refreshing the token
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        // Refresh the access token
        refreshAccessToken()

        // Retrieve the encrypted token from localStorage
        const encryptedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (encryptedToken) {
          setUser(user)
          setIsLoggedIn(true)
        } else {
          // No token found, clear user and login status
          setUser(null)
          setIsLoggedIn(false)

          // Remove the token and user from localStorage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }

      // No token found, clear user and login status
      setUser(null)
      setIsLoggedIn(false)

      // Remove the token and user from localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [])

  return { user, isLoggedIn }
}

// Helper function to check if the token is valid
const isTokenValid = (token: string, storedUser: string | null) => {
  // Check if token is not expired
  const decodedPayload = jwt_decode(token) as { exp: number }

  if (decodedPayload.exp < Date.now() / 1000) {
    // Check if there is a refresh token in localStorage
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
      // Refresh the access token
      refreshAccessToken()

      return true
    } else {
      return false
    }
  }

  // Check if there is a user in localStorage
  if (!storedUser) {
    // Check if there is a refresh token in localStorage
    const refreshToken = localStorage.getItem('refreshToken')

    if (refreshToken) {
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

const refreshAccessToken = async () => {
  // Retrieve the refresh token from localStorage
  const token = localStorage.getItem('refreshToken')
  try {
    const response = await axios.post('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: token,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    })
    // Store the new token in localStorage
    const encryptedToken = CryptoJS.AES.encrypt(
      response.data.access_token,
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString()

    localStorage.setItem('token', encryptedToken)

    // Store the new refresh token in localStorage
    localStorage.setItem('refreshToken', response.data.refresh_token)

    // Store the new user in localStorage
    const user = jwt_decode(response.data.access_token) as { user: string }

    localStorage.setItem('user', JSON.stringify(user.user))
  } catch (error) {
    console.log(error)
  }
}

export default useUser

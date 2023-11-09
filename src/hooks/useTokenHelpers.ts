import React from 'react'
import jwt_decode from 'jwt-decode'
import { encrypt, decrypt } from 'lib/tokenization'

export default function useTokenHelpers() {
  // Remove the token and user from localStorage
  const clearCredentials = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const readTokensFromLocalStorage = () => {
    const encryptedToken = localStorage.getItem('token')
    const encryptedRefreshToken = localStorage.getItem('refreshToken')
    return {
      accessToken: encryptedToken ? decrypt(encryptedToken as string) : null,
      refreshToken: encryptedRefreshToken ? decrypt(encryptedRefreshToken as string) : null
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
        // // Refresh the access token
        // refreshAccessToken()

        return true
      } else {
        return false
      }
    }

    // Token is valid
    return true
  }

  return { encrypt, decrypt, clearCredentials, isTokenValid, readTokensFromLocalStorage }
}

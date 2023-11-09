import React from 'react'

import { User } from 'lib/types'
import { useAppProgress } from 'features/AppProgress'
import useTokenHelpers from './useTokenHelpers'
import { AccessTokenNotFoundError, InvalidAccessTokenError } from 'lib/errors'

interface UserStateHook {
  userState: [User | null, React.Dispatch<React.SetStateAction<User | null>>]
  isLoggedInState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  hasRefreshTokenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  checkForAuth: () => Promise<void>
}

export default function useUserState(): UserStateHook {
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [hasRefreshToken, setHasRefreshToken] = React.useState(false)
  const { decrypt, isTokenValid, clearCredentials, readTokensFromLocalStorage } = useTokenHelpers()
  const appProgress = useAppProgress()

  const checkForAuth = async () => {
    appProgress.setLoading(true)
    const { accessToken, refreshToken } = readTokensFromLocalStorage()
    const storedUser = localStorage.getItem('user')

    try {
      appProgress.setLoading(true)
      if (accessToken) {
        // // Decrypt the token using the encryption key
        // const decryptedToken = decrypt(encryptedToken)

        // Check if the decrypted token is valid (e.g., not expired)
        if (!isTokenValid(accessToken)) {
          throw new InvalidAccessTokenError('Token is expired or invalid')
        }

        // Token is valid, set the user and login status
        const decryptedUser = decrypt(storedUser as string)

        setUser(JSON.parse(decryptedUser))
        setIsLoggedIn(true)
      } else {
        // No token found. Dependent logic should try refreshing the token
        setHasRefreshToken(refreshToken ? true : false)

        throw new AccessTokenNotFoundError('No access token found')
      }
    } catch (error) {
      if (error instanceof InvalidAccessTokenError || error instanceof AccessTokenNotFoundError) {
        // Token is expired or invalid, clear user and login status
        setUser(null)
        setIsLoggedIn(false)
        clearCredentials()
      }
    } finally {
      appProgress.setLoading(false)
    }
  }

  return {
    userState: [user, setUser],
    isLoggedInState: [isLoggedIn, setIsLoggedIn],
    hasRefreshTokenState: [hasRefreshToken, setHasRefreshToken],
    checkForAuth
  }
}

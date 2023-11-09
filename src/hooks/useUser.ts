import { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppDefaults from './useAppDefaults'
import useTokenHelpers from './useTokenHelpers'
import { User } from 'lib/types'
import useUserState from './useUserState'
import useAccessToken from './useAccessToken'

/**
 * @TODO: Refactor useUser to use useAccessToken hook
 * @TODO: Refactor useUser to use useUserState hook
 */
const useUser = () => {
  const { userState, isLoggedInState, hasRefreshTokenState, checkForAuth } = useUserState()
  const [user, setUser] = userState
  // const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = isLoggedInState
  const [hasRefreshToken, setHasRefreshToken] = hasRefreshTokenState
  const location = useLocation()
  const navigate = useNavigate()
  const { redirect_path } = useAppDefaults()
  const { encrypt, isTokenValid, clearCredentials, readTokensFromLocalStorage } = useTokenHelpers()
  const { loading, refresh: refreshAccessToken } = useAccessToken()

  // const refreshAccessToken = async () => {
  //   // Retrieve the refresh token from localStorage
  //   const { refreshToken } = readTokensFromLocalStorage()

  //   try {
  //     setLoading(true)
  //     const response = await axios.post('/oauth/token', {
  //       headers: { 'X-Skip-Authorization-Header': 'yes' },
  //       grant_type: 'refresh_token',
  //       refresh_token: refreshToken,
  //       client_id: process.env.REACT_APP_CLIENT_ID,
  //       client_secret: process.env.REACT_APP_CLIENT_SECRET
  //     })
  //     // Encrypt and store the new token in localStorage
  //     const encryptedToken = encrypt(response.data.access_token)
  //     localStorage.setItem('token', encryptedToken)
  //     // Encrypt and Store the new refresh token in localStorage
  //     const encryptedRefreshToken = encrypt(response.data.refresh_token)
  //     localStorage.setItem('refreshToken', encryptedRefreshToken)
  //     // Encrypt and store the user in localStorage
  //     const user = jwt_decode(response.data.access_token)
  //     const encryptedUser = encrypt(JSON.stringify(user))
  //     localStorage.setItem('user', encryptedUser)
  //     // Set the user and login status
  //     setUser(encryptedUser as unknown as User)
  //     if (response.data.refresh_token) setHasRefreshToken(true)
  //     setIsLoggedIn(true)
  //   } catch (error) {
  //     // No token found, clear user and login status
  //     setUser(null)
  //     setIsLoggedIn(false)
  //     clearCredentials()
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    checkForAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { accessToken } = readTokensFromLocalStorage()
    if (!!accessToken && isTokenValid(accessToken)) {
      console.debug('<< Access token is valid >>')
    } else {
      if (hasRefreshToken) {
        console.debug('<< Refeshing access token >>')
        refreshAccessToken()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasRefreshToken])

  useEffect(() => {
    console.debug('Logged in!', { where: location.pathname, state: location.state })
    if (!!user && !loading) {
      // TODO: This seems ridiculous. Can this logic be better?
      if (
        location.pathname === '/login' &&
        !!location.state?.from.pathname &&
        location.state?.from.pathname !== location.pathname
      ) {
        navigate(location.state.from.pathname)
      } else if (/^\/(?:login)?$/.test(location.pathname)) {
        console.debug('Should navigate to protected landing page...')
        navigate(redirect_path)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])

  return { loading, user, isLoggedIn }
}

export default useUser // Export the hook

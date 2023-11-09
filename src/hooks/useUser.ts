import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppDefaults from './useAppDefaults'
import useTokenHelpers from './useTokenHelpers'
import { User } from 'lib/types'
import useAccessToken from './useAccessToken'
import { AccessTokenNotFoundError, InvalidAccessTokenError } from 'lib/errors'

/**
 * @TODO: Refactor useUser to use useAccessToken hook
 */
const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { redirect_path } = useAppDefaults()
  const { decrypt, isTokenValid, clearCredentials, readTokensFromLocalStorage } = useTokenHelpers()
  const { loading: loadingRefreshedToken, refresh: refreshAccessToken } = useAccessToken()

  const checkingAuthOrLoadingTokens = React.useMemo(
    () => loading || loadingRefreshedToken,
    [loading, loadingRefreshedToken]
  )

  const checkForAuth = async () => {
    const { accessToken, refreshToken } = readTokensFromLocalStorage()
    try {
      setLoading(true)
      if (!accessToken) throw new AccessTokenNotFoundError('No access token found')
      if (!isTokenValid(accessToken)) throw new InvalidAccessTokenError('Access token is invalid')

      const storedUser = localStorage.getItem('user')
      // Token is valid, set the user and login status
      const decryptedUser = decrypt(storedUser as string)
      setUser(JSON.parse(decryptedUser))
      setIsLoggedIn(true)
    } catch (error) {
      if (error instanceof InvalidAccessTokenError || error instanceof AccessTokenNotFoundError) {
        if (!!refreshToken) await refreshAccessToken()

        // Token is expired or invalid, clear user and login status
        setUser(null)
        setIsLoggedIn(false)
        clearCredentials()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkForAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.debug('Logged in!', { where: location.pathname, state: location.state })
    if (!!user && !checkingAuthOrLoadingTokens) {
      // TODO: This seems ridiculous. Can this logic be better?
      if (
        location.pathname === '/login' &&
        !!location.state?.from.pathname &&
        location.state?.from.pathname !== location.pathname
      ) {
        navigate(`${location.state.from.pathname}${location.state.from.search}`)
      } else if (/^\/(?:login)?$/.test(location.pathname)) {
        console.debug('Should navigate to protected landing page...')
        navigate(redirect_path)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAuthOrLoadingTokens, user])

  return { loading: checkingAuthOrLoadingTokens, user, isLoggedIn }
}

export default useUser // Export the hook

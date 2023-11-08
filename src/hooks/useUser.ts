import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import jwt_decode from 'jwt-decode'
import axios from 'lib/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAppDefaults from './useAppDefaults'
import useTokenHelpers from './useTokenHelpers'

export type User = {
  name: string
}

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
  const { isTokenValid, clearCredentials } = useTokenHelpers()

  // TODO: break down as useRefreshAccessToken hook
  const refreshAccessToken = async () => {
    // Retrieve the refresh token from localStorage
    const currentEncryptedRefreshToken = localStorage.getItem('refreshToken')
    const refreshToken = CryptoJS.AES.decrypt(
      currentEncryptedRefreshToken as string,
      process.env.REACT_APP_ENCRYPTION_KEY as string
    ).toString(CryptoJS.enc.Utf8)

    try {
      setLoading(true)
      const response = await axios.post('/oauth/token', {
        headers: { 'X-Skip-Authorization-Header': 'yes' },
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET
      })
      console.debug({ response })

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
    } finally {
      setLoading(false)
    }
  }

  const checkForAuth = async () => {
    setLoading(true)
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
        await refreshAccessToken()
      }

      // No token found, clear user and login status
      setUser(null)
      setIsLoggedIn(false)
      clearCredentials()
    }
    setLoading(false)
  }

  useEffect(() => {
    checkForAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.debug('Logged in!', { where: location.pathname, state: location.state })
    if (!!user && !loading) {
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
  }, [loading, user])

  return { loading, user, isLoggedIn }
}

export default useUser // Export the hook

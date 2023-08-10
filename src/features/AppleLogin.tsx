import React from 'react'
import AppleOauth from 'components/shared/AppleOauth'
import axios from 'axios'
// import CryptoJS from 'crypto-js'

interface NameI {
  firstName: string
  lastName: string
}

interface UserI {
  name: NameI
  email: string
}

interface AuthorizationI {
  code: string
  id_token?: string
  state?: string
}

interface SignInResponseI {
  user?: UserI
  authorization: AuthorizationI
}

interface SignInErrorI {
  error: string
}

function isSignInError(resp: SignInResponseI|SignInErrorI): resp is SignInErrorI {
  return 'error' in resp && resp.error !== undefined
}

export default function AppleLogin() {
  const handleLoginCallback = async (resp: SignInResponseI|SignInErrorI) => {
    if(isSignInError(resp)) {
      console.error('Apple login failed', resp)
      return
    }
    console.log('Apple login successful')

    const { id_token, code } = resp.authorization
    const data = {
      id_token,
      code,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/oauth/apple`, data)
      const { access_token: accessToken, refresh_token: refreshToken, user } = res.data
      console.debug({ accessToken, refreshToken, user })
      // const encryptedToken = CryptoJS.AES.encrypt(accessToken, process.env.REACT_APP_ENCRYPTION_KEY as string).toString()
      // const encryptedRefreshToken = CryptoJS.AES.encrypt(
      //   refreshToken,
      //   process.env.REACT_APP_ENCRYPTION_KEY as string
      // ).toString()
      // const encryptedUser = CryptoJS.AES.encrypt(
      //   JSON.stringify(user),
      //   process.env.REACT_APP_ENCRYPTION_KEY as string
      // ).toString()

      // localStorage.setItem('authProvider', 'apple')
      // localStorage.setItem('refreshToken', encryptedRefreshToken)
      // localStorage.setItem('token', encryptedToken)
      // localStorage.setItem('user', encryptedUser)

      // window.location.reload()
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <AppleOauth 
      onSuccess={handleLoginCallback} 
      onError={handleLoginCallback} />
  )
}
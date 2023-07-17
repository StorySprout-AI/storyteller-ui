import React from 'react'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import GoogleOauth from './shared/GoogleOauth'
import axios from 'axios'
import CryptoJS from 'crypto-js'

const StyledContainer = styled(Grid)`
  height: 100vh;
  background-color: #f5f5f5; /* Replace with your desired background color */
`

const StyledFormContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

const Login = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Google login successful')

    const data = {
      credential: credentialResponse.credential,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    }
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/api/oauth/google`, data)
      .then((res) => {
        const token = res.data.access_token
        const user = res.data.user
        const encryptedToken = CryptoJS.AES.encrypt(token, process.env.REACT_APP_ENCRYPTION_KEY as string).toString()
        const encryptedRefreshToken = CryptoJS.AES.encrypt(
          res.data.refresh_token,
          process.env.REACT_APP_ENCRYPTION_KEY as string
        ).toString()
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          process.env.REACT_APP_ENCRYPTION_KEY as string
        ).toString()

        localStorage.setItem('refreshToken', encryptedRefreshToken)
        localStorage.setItem('token', encryptedToken)
        localStorage.setItem('user', encryptedUser)

        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLoginError = () => {
    console.log('Google login failed')
    // Add your logic here for handling login errors
  }

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <StyledFormContainer item xs={12} sm={6} md={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to StorySprout
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Login to continue
        </Typography>
        <GoogleOauth onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default Login

import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import GoogleOauth from './shared/GoogleOauth'

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

const StyledButton = styled(Button)`
  margin-top: 16px;
`

const Login = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log('Google login successful')
    console.log(credentialResponse)
    // Add your logic here for handling successful login with Google
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

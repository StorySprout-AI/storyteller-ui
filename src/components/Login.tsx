import React from 'react'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import ButtonStack from 'components/shared/ButtonStack'
import Feature from 'features/FeatureFlags/Feature'
import { AuthStatus } from './shared/AuthProvider'

import featureFlags from 'lib/features'

import GoogleLogin from 'features/GoogleLogin'
import AppleLogin from 'features/AppleLogin'

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
  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <StyledFormContainer item xs={12} sm={6} md={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to StorySprout
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          <AuthStatus />
        </Typography>
        <ButtonStack>
          <GoogleLogin />
        </ButtonStack>
        <Feature flag={featureFlags.APPLE_LOGIN}>
          <ButtonStack>
            <AppleLogin />
          </ButtonStack>
        </Feature>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default Login

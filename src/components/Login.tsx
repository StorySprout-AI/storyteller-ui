import React, { useContext } from 'react'
import { Grid, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import GoogleLogin from 'features/GoogleLogin'
import AppleLogin from 'features/AppleLogin'
import { FeatureFlagContext } from 'features/FeatureFlags'

const StyledContainer = styled(Grid)`
  height: 100vh;
  background-color: #f5f5f5; /* Replace with your desired background color */
`

const ButtonFrame = styled(Container)`
  display: flex;
  margin: 3px 0;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledFormContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

const Login = () => {
  const { isEnabled } = useContext(FeatureFlagContext)

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <StyledFormContainer item xs={12} sm={6} md={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to StorySprout
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Login to continue
        </Typography>
        <ButtonFrame>
          <GoogleLogin />
        </ButtonFrame>
        {isEnabled('feat__apple_login') && <ButtonFrame><AppleLogin /></ButtonFrame>}
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default Login

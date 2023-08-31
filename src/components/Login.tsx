import React from 'react'
import { Grid, Typography } from '@mui/material'
import styled from '@mui/system/styled'
import ButtonStack from 'components/shared/ButtonStack'
import Feature from 'features/FeatureFlags/Feature'
import { AuthStatus } from './shared/AuthProvider'

import featureFlags from 'lib/features'

import GoogleLogin from 'features/GoogleLogin'
import AppleLogin from 'features/AppleLogin'
import withRoot from 'themes/onepirate/modules/withRoot'
import ProductHero from 'components/ProductHero'
import AppFooter from './AppFooter'

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
    <>
      <ProductHero />
      <StyledContainer container justifyContent="center" alignItems="center">
        <StyledFormContainer item xs={12} sm={6} md={4}>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Get ready for storytime
            <br />
            like never before!
          </Typography>
          <Typography variant="body1">
            We use the magic of AI to whip up awesome short stories that kids of all ages will love. It&apos;s like
            having a story buddy that&apos;s always up for an adventure!
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
      <AppFooter />
    </>
  )
}

export default withRoot(Login)

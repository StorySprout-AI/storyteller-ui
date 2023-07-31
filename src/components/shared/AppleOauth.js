import React from 'react'
import AppleLogin from './AppleLogin'
// import AppleLogin from 'react-apple-signin-auth'

export default function AppleOauth({ ...rest }) {
  // return <AppleLogin authOptions={{
  //   clientId: 'app.storysprout.web.auth',
  //   scope: 'email name',
  //   redirectURI: 'https://api.storysprout.ngrok.io/api/oauth/apple',
  //   state: '',
  //   nonce: 'nonce',
  //   usePopup: true,
  // }} 
  // uiType="dark" 
  // className="apple-auth-btn" 
  // buttonExtraChildren={["Continue with Apple"]} 
  // {...rest} />

  return (
    <AppleLogin 
      clientId="app.storysprout.web.auth"
      redirectURI="https://api.storysprout.ngrok.io/api/oauth/apple" />
  )
}

import useURLFragmentParams from 'hooks/useURLFragmentParams'
import React, { useEffect } from 'react'
import AppleLogin from 'react-apple-login'

export default function AppleOauth({ ...rest }) {
  const { onSuccess, onError } = rest
  const { code, id_token, state, error } = useURLFragmentParams()

  useEffect(() => {
    if(code && id_token && state)
      onSuccess({ 
        credential: id_token, 
        authorization: { code, id_token, state } 
      })
    else if(error)
      onError(error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, id_token, state, error])

  return (
    <AppleLogin 
      responseType="code id_token"
      responseMode="fragment"
      state="apple_oauth_via_fragment"
      clientId="app.storysprout.web.auth"
      redirectURI="https://storysprout.ngrok.app"
      designProp={{ width: 180, height: 40, border_radius: 10 }}
      style={{ marginTop: 10 }} />
)
}

import React, { useCallback } from 'react'
import AppleLogin from 'react-apple-login'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export default function AppleOauth({ ...rest }) {
  const { onSuccess, onError } = rest
  const location = useLocation()
  const { code, id_token, state } = queryString.parse(location.hash)

  console.debug({ code, id_token, state })

  const handleCallback = useCallback((data) => {
    console.debug('Apple login response', { data })
    if (data.error) {
      console.error(data.error)
      onError(data)
    } else {
      console.info({ data })
      onSuccess(data)
    }
  }, [onSuccess, onError])

  return (
    <AppleLogin 
      responseType="code id_token"
      responseMode="fragment"
      state="apple_oauth_via_fragment"
      callback={handleCallback}
      clientId="app.storysprout.web.auth"
      redirectURI="https://storysprout.ngrok.app"
      designProp={{ width: 180, height: 40, border_radius: 10 }}
      style={{ marginTop: 10 }} />
)
}

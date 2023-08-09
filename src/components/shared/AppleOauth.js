/// <reference types="../../react-apple-login" />

import React, { useCallback } from 'react'
import AppleLogin from 'react-apple-login'

export default function AppleOauth({ ...rest }) {
  const { onSuccess, onError } = rest

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
      usePopup
      responseType="code id_token"
      responseMode="query"
      callback={handleCallback}
      clientId="app.storysprout.web.auth"
      redirectURI="https://storysprout.ngrok.app"
      designProp={{ width: 180, height: 40, border_radius: 10 }}
      style={{ marginTop: 10 }} />
  )
}

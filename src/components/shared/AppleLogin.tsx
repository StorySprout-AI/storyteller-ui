import React, { useCallback, useEffect } from 'react'
import MetaTag from './MetaTag'
import ScriptTag from './ScriptTag'

interface AppleLoginProps {
  clientId: string
  redirectURI: string
  scope?: string
  state?: string
  nonce?: string
  usePopup?: boolean
}

export default function AppleLogin({ clientId, scope = "name email", state, nonce, redirectURI, usePopup = true }: AppleLoginProps) {
  const onSuccess = useCallback((event: any) => {
    console.debug(event)
  }, [])
  const onError = useCallback((event: any) => {
    console.error(event)
  }, [])

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', onSuccess)
    document.addEventListener('AppleIDSignInOnFailure', onError)

    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', onSuccess)
      document.removeEventListener('AppleIDSignInOnFailure', onError)
    }
  })

  return (
    <>
      {clientId && <MetaTag name="appleid-signin-client-id" content={clientId} />}
      {scope && <MetaTag name="appleid-signin-scope" content={scope} />}
      {redirectURI && <MetaTag name="appleid-signin-redirect-uri" content={redirectURI} />}
      {state && <MetaTag name="appleid-signin-state" content={state} />}
      {nonce && <MetaTag name="appleid-signin-nonce" content={nonce} />}
      <MetaTag name="appleid-signin-use-popup" content={usePopup ? "true" : "false"} />
      <ScriptTag id="apple-js" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" />
      {/* Doc on the button: https://appleid.apple.com/signinwithapple/button */}
      <div id="appleid-signin" 
        data-color="black" 
        data-border="false" 
        data-type="continue"
        data-width="180"
        data-height="40"
        data-border-radius="10"
        style={{ marginTop: 10 }}></div>
    </>
  )
}

import React, { useEffect } from 'react'
import MetaTag from 'components/shared/MetaTag'
import ScriptTag from 'components/shared/ScriptTag'
import { SignInErrorI, SignInResponseI } from './types'

import useDomainWarningCookie from './useDomainWarningCookie'

interface AppleLoginProps {
  clientId: string
  redirectURI: string
  onSuccess: (event: CustomEvent<SignInResponseI>) => void
  onError: (event: CustomEvent<SignInErrorI>) => void
  scope?: string
  state?: string
  nonce?: string
  usePopup?: boolean
  responseMode?: 'fragment' | 'query'
  responseType?: 'code' | 'id_token' | 'id_token code' | 'code id_token'
}

export default function AppleOauth({
  clientId,
  scope = 'name email',
  state = 'apple_oauth_via_fragment',
  nonce,
  redirectURI,
  responseMode = 'fragment',
  responseType = 'code id_token',
  usePopup = true,
  onSuccess,
  onError
}: AppleLoginProps) {
  const domainWarning = useDomainWarningCookie()

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', onSuccess as any)
    document.addEventListener('AppleIDSignInOnFailure', onError as any)

    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', onSuccess as any)
      document.removeEventListener('AppleIDSignInOnFailure', onError as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    domainWarning.check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainWarning.alreadyShown])

  return (
    <>
      <MetaTag name="appleid-signin-client-id" content={clientId} />
      <MetaTag name="appleid-signin-redirect-uri" content={redirectURI} />
      <MetaTag name="appleid-signin-response-type" content={responseType} />
      <MetaTag name="appleid-signin-response-mode" content={responseMode} />
      <MetaTag name="appleid-signin-use-popup" content={usePopup ? 'true' : 'false'} />
      {scope && <MetaTag name="appleid-signin-scope" content={scope} />}
      {state && <MetaTag name="appleid-signin-state" content={state} />}
      {nonce && <MetaTag name="appleid-signin-nonce" content={nonce} />}
      <ScriptTag
        id="apple-js"
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
      />
      {/* Doc on the button: https://appleid.apple.com/signinwithapple/button */}
      <div
        id="appleid-signin"
        data-color="black"
        data-border="false"
        data-type="continue"
        data-width="180"
        data-height="40"
        data-border-radius="10"
        style={{ marginTop: 10 }}
      ></div>
    </>
  )
}

import React, { useCallback, useEffect, useState } from 'react'
import MetaTag from 'components/shared/MetaTag'
import ScriptTag from 'components/shared/ScriptTag'
import { SignInErrorI, SignInResponseI } from './types'
import { useCookies } from 'react-cookie'

import { COOKIE_FLAGS, FEATURE_FLAGS } from 'lib/constants'

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

function isSupportedDomain() {
  return /^https:\/\/(?:(?:.*.)?storysprout|storysprout.ngrok).app/gm.test(window.location.href)
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
  const [cookies, setCookie] = useCookies([FEATURE_FLAGS.APPLE_LOGIN])
  const [hasSeenDomainWarning, setHasSeenDomainWarning] = useState<string>(
    () => cookies[COOKIE_FLAGS.APPLE_LOGIN.HAS_SEEN_DOMAIN_WARNING]
  )

  const shouldShowDomainWarning = useCallback(() => {
    return !isSupportedDomain() && hasSeenDomainWarning !== 'yes'
  }, [hasSeenDomainWarning])

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
    /**
     * TODO: Make sure app is on supported domain - and include helpful dev docs
     *   to fix the issue
     */
    if (shouldShowDomainWarning()) {
      setHasSeenDomainWarning('yes')
      alert(
        `From the app URL ${window.location.href} ` +
          'you will probably not be able to Sign In ' +
          'with Apple: https://regex101.com/r/yhs1AT/1'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowDomainWarning])

  // Manage cookie values
  useEffect(() => {
    if (!setCookie) return

    setCookie(COOKIE_FLAGS.APPLE_LOGIN.HAS_SEEN_DOMAIN_WARNING, hasSeenDomainWarning)
  }, [setCookie, hasSeenDomainWarning])

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

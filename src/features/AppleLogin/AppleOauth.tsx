import React, { useEffect } from 'react'

import MetaTag from 'components/shared/MetaTag'
import ScriptTag from 'features/ScriptTag'
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

function AppleOauth({
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
  const buttonRef = React.createRef<HTMLDivElement>()
  const domainWarning = useDomainWarningCookie()
  const [loaded, setLoaded] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)
  const [libraryLastCheckTime, setLibraryLastCheckTime] = React.useState<Date>()

  const onLoaded = React.useCallback(() => setLoaded(true), [])

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
    const checkInterval = setInterval(() => setLibraryLastCheckTime(new Date()), 1000)

    console.debug({ loaded, div: buttonRef.current, typecheck: typeof AppleID, libraryLastCheckTime })
    if (loaded && typeof AppleID !== 'undefined' && !!buttonRef.current && !initialized) {
      clearInterval(checkInterval)
      console.debug('<<< initializing AppleID auth >>>')
      // eslint-disable-next-line no-undef
      AppleID.auth.init({
        clientId,
        scope,
        redirectURI,
        state,
        nonce,
        usePopup
      })
      setInitialized(true)
    }

    return () => {
      if (!!checkInterval) clearInterval(checkInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, buttonRef.current, libraryLastCheckTime])

  useEffect(() => {
    domainWarning.check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainWarning?.shouldShow])

  return (
    <>
      <MetaTag name="appleid-signin-response-type" content={responseType} />
      <MetaTag name="appleid-signin-response-mode" content={responseMode} />
      {/* Doc on the button: https://appleid.apple.com/signinwithapple/button */}
      <div
        ref={buttonRef}
        id="appleid-signin"
        data-color="black"
        data-border="false"
        data-type="continue"
        data-width="180"
        data-height="40"
        data-border-radius="10"
        style={{ marginTop: 10 }}
      ></div>
      <ScriptTag
        id="apple-js"
        src="//appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        callback={onLoaded}
      />
    </>
  )
}

export default AppleOauth

import React, { useEffect } from 'react'
import dayjs from './day'

import MetaTag from 'components/shared/MetaTag'
import ScriptTag from 'features/ScriptTag'
import PropTypes from 'prop-types'
// import { SignInErrorI, SignInResponseI } from './types'

import useDomainWarningCookie from './useDomainWarningCookie'

// interface AppleLoginProps {
//   clientId: string
//   redirectURI: string
//   onSuccess: (event: CustomEvent<SignInResponseI>) => void
//   onError: (event: CustomEvent<SignInErrorI>) => void
//   scope?: string
//   state?: string
//   nonce?: string
//   usePopup?: boolean
//   responseMode?: 'fragment' | 'query'
//   responseType?: 'code' | 'id_token' | 'id_token code' | 'code id_token'
// }

function AppleOauth({
  clientId,
  scope = 'name email',
  state = 'apple_oauth_via_fragment',
  nonce = null,
  redirectURI,
  responseMode = 'fragment',
  responseType = 'code id_token',
  usePopup = true,
  onSuccess,
  onError
}) {
  const buttonRef = React.useRef()
  const domainWarning = useDomainWarningCookie()
  const [loaded, setLoaded] = React.useState(false)
  const [initialized, setInitialized] = React.useState(false)
  const [libraryLastCheckTime, setLibraryLastCheckTime] = React.useState()

  const onLoaded = React.useCallback(() => setLoaded(true), [])

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', onSuccess)
    document.addEventListener('AppleIDSignInOnFailure', onError)

    return () => {
      document.removeEventListener('AppleIDSignInOnSuccess', onSuccess)
      document.removeEventListener('AppleIDSignInOnFailure', onError)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const checkInterval = setInterval(() => setLibraryLastCheckTime(dayjs()), 1000)

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
      {/* <MetaTag name="appleid-signin-client-id" content={clientId} />
      <MetaTag name="appleid-signin-redirect-uri" content={redirectURI} /> */}
      <MetaTag name="appleid-signin-response-type" content={responseType} />
      <MetaTag name="appleid-signin-response-mode" content={responseMode} />
      {/* <MetaTag name="appleid-signin-use-popup" content={usePopup ? 'true' : 'false'} /> */}
      {/* {scope && <MetaTag name="appleid-signin-scope" content={scope} />*/}
      {/* state && <MetaTag name="appleid-signin-state" content={state} />*/}
      {/* nonce && <MetaTag name="appleid-signin-nonce" content={nonce} />} */}
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

AppleOauth.propTypes = {
  clientId: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  scope: PropTypes.string,
  state: PropTypes.string,
  nonce: PropTypes.string,
  usePopup: PropTypes.bool,
  responseMode: PropTypes.oneOf(['fragment', 'query']),
  responseType: PropTypes.oneOf(['code', 'id_token', 'id_token code', 'code id_token'])
}

export default AppleOauth

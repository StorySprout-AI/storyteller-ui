import React, { useEffect } from 'react'

import Skeleton from '@mui/material/Skeleton'

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
  const [loaded, setLoaded] = React.useState(() => false)
  const [initialized, setInitialized] = React.useState(() => false)
  const [libraryLastCheckTime, setLibraryLastCheckTime] = React.useState<Date>()
  const [libraryCheckTimes, setLibraryCheckTimes] = React.useState<Date[]>([])

  const dims = { width: 200, height: 40 }

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
    const checkInterval = setInterval(() => {
      const latestCheckTime = new Date()
      setLibraryLastCheckTime(latestCheckTime)
      setLibraryCheckTimes([...libraryCheckTimes, latestCheckTime])
      console.debug({ libraryCheckTimes })
    }, 1000)

    console.debug({ loaded, div: buttonRef.current, typecheck: typeof AppleID, libraryLastCheckTime })

    if (initialized) {
      console.debug('<<< AppleID JS library is already initialized >>>')
      clearInterval(checkInterval)
    } else if (loaded && typeof AppleID !== 'undefined' && !!buttonRef.current && !initialized) {
      clearInterval(checkInterval)
      console.debug('<<< initializing AppleID JS library >>>')
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
    } else {
      if (libraryCheckTimes.length >= 10) {
        console.debug('<<< clearing interval to check AppleID JS library >>>')
        clearInterval(checkInterval)
      }
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
      {!initialized && <Skeleton width={dims.width} height={dims.height + 25} animation="wave" />}
      <div
        ref={buttonRef}
        id="appleid-signin"
        data-color="black"
        data-border="false"
        data-type="continue"
        data-width={dims.width}
        data-height={dims.height}
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

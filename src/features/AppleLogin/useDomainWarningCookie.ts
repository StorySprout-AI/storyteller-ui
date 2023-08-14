import { useCallback, useEffect, useState } from 'react'

import { COOKIE_FLAGS, FEATURE_FLAGS } from 'lib/constants'
import { useCookies } from 'react-cookie'

function isSupportedDomain() {
  return /^https:\/\/(?:(?:.*.)?storysprout|storysprout.ngrok).app/gm.test(window.location.href)
}

export default function useDomainWarningCookie() {
  /**
   * TODO: What does passing in this argument to useCookies do when setting it up
   *   for the app? Are we setting up useCookies correctly in this context?
   */
  const [cookies, setCookie] = useCookies([FEATURE_FLAGS.APPLE_LOGIN])
  const [alreadyShown, setAlreadyShown] = useState(
    () => cookies[COOKIE_FLAGS.APPLE_LOGIN.HAS_SEEN_DOMAIN_WARNING] ?? 'no'
  )

  const shouldShow = useCallback(() => {
    return !isSupportedDomain() && alreadyShown !== 'yes'
  }, [alreadyShown])

  const check = useCallback(() => {
    /**
     * TODO: Make sure app is on supported domain - and include helpful dev docs
     *   to fix the issue
     */
    if (shouldShow()) {
      setAlreadyShown('yes')
      // TODO: Change this to a modal component instead
      alert(
        `From the app URL ${window.location.href} ` +
          'you will probably not be able to Sign In ' +
          'with Apple: https://regex101.com/r/yhs1AT/1'
      )
    }
  }, [shouldShow])

  useEffect(() => {
    setCookie(COOKIE_FLAGS.APPLE_LOGIN.HAS_SEEN_DOMAIN_WARNING, alreadyShown)
  }, [setCookie, alreadyShown])

  return { check, shouldShow, alreadyShown }
}

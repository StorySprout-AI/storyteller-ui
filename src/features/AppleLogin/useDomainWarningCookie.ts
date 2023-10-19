import { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import featureFlags from 'lib/features'

function isSupportedDomain() {
  return /^https:\/\/(?:(?:.*.)?storysprout|storysprout.ngrok).app/gm.test(window.location.href)
}

export default function useDomainWarningCookie() {
  /**
   * TODO: What does passing in this argument to useCookies do when setting it up
   *   for the app? Are we setting up useCookies correctly in this context?
   */
  const [cookies, setCookie] = useCookies([featureFlags.APPLE_LOGIN])
  const [hasSeenDomainWarning, setHasSeenDomainWarning] = useState(
    () => cookies[featureFlags.APPLE_LOGIN]?.hasSeenDomainWarning ?? 'no'
  )

  const shouldShow = useCallback(() => {
    return !isSupportedDomain() && hasSeenDomainWarning !== 'yes'
  }, [hasSeenDomainWarning])

  const check = useCallback(() => {
    /**
     * TODO: Make sure app is on supported domain - and include helpful dev docs
     *   to fix the issue
     */
    if (shouldShow()) {
      setHasSeenDomainWarning('yes')
      // TODO: Change this to a modal component instead
      alert(
        `From the app URL ${window.location.href} ` +
          'you will probably not be able to Sign In ' +
          'with Apple: https://regex101.com/r/yhs1AT/1'
      )
    }
  }, [shouldShow])

  useEffect(() => {
    setCookie(featureFlags.APPLE_LOGIN, { hasSeenDomainWarning })
  }, [setCookie, hasSeenDomainWarning])

  return { check, shouldShow, alreadyShown: hasSeenDomainWarning }
}

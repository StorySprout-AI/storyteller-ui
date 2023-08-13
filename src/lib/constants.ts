import FEATURE_FLAGS from './features'

export { default as FEATURE_FLAGS } from './features'

export const COOKIE_FLAGS = {
  APPLE_LOGIN: {
    HAS_SEEN_DOMAIN_WARNING: `${FEATURE_FLAGS.APPLE_LOGIN}.hasSeenDomainWarning`
  }
}

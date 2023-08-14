import FEATURE_FLAGS from './features'

export { default as FEATURE_FLAGS } from './features'

const FEAT_COOKIE_GROUPS = Object.keys(FEATURE_FLAGS)

type FeatureCookieType = (typeof FEAT_COOKIE_GROUPS)[number]

export const COOKIE_FLAGS: Record<FeatureCookieType, Record<string, string>> = {
  APPLE_LOGIN: {
    HAS_SEEN_DOMAIN_WARNING: `${FEATURE_FLAGS.APPLE_LOGIN}.hasSeenDomainWarning`
  }
}

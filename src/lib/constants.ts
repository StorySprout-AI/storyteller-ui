import FEATURE_FLAGS from './features'

export { default as FEATURE_FLAGS } from './features'

const FEAT_COOKIE_GROUPS = Object.keys(FEATURE_FLAGS)

type FeatureCookieType = (typeof FEAT_COOKIE_GROUPS)[number]

export const COOKIE_FLAGS: Record<FeatureCookieType, Record<string, string>> = {
  APPLE_LOGIN: {
    HAS_SEEN_DOMAIN_WARNING: `${FEATURE_FLAGS.APPLE_LOGIN}.hasSeenDomainWarning`
  }
}

// export const ALL_COOKIE_FLAGS = Object.entries(COOKIE_FLAGS).map<Array<[FeatureCookieType, Record<string, string>]>>(
//   ([key, value]) => {
//     return Object.entries(value).map(([vKey, vValue]) => vValue)
//   }
// )

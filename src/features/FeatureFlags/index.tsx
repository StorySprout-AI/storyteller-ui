import Provider, { useFeatureFlagsContext } from './Provider'

export * from './useFeatureFlags'
export * from './Provider'

const FeatureFlagsAPI = {
  Provider,
  useContext: useFeatureFlagsContext
}

export default FeatureFlagsAPI

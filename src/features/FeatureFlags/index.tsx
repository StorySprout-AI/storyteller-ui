import Provider, { useFeatureFlagsContext } from './Provider'

export * from './useFeatureFlags'

const FeatureFlagsAPI = {
  Provider,
  useContext: useFeatureFlagsContext
}

export default FeatureFlagsAPI

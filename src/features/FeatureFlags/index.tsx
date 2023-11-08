import React from 'react'
import useFeatureFlags, { FeatureFlagContext } from './useFeatureFlags'

export * from './useFeatureFlags'

interface FeatureFlagProviderProps {
  children: React.ReactNode
}

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const featureFlags = useFeatureFlags()

  return <FeatureFlagContext.Provider value={featureFlags}>{children}</FeatureFlagContext.Provider>
}

const FeatureFlagsAPI = {
  Provider: FeatureFlagProvider
}

export default FeatureFlagsAPI

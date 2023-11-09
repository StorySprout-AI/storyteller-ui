import React from 'react'
import { FeatureFlagsHook } from './types'
import useFeatureFlags from './useFeatureFlags'

type FeatureFlagContextType = Omit<FeatureFlagsHook, 'error' | 'loadFlags'>

interface FeatureFlagProviderProps {
  children: React.ReactNode
}

const FeatureFlagContext = React.createContext<FeatureFlagContextType>(null!)

export function useFeatureFlagsContext() {
  return React.useContext(FeatureFlagContext)
}

export function FeatureFlagsProvider({ children }: FeatureFlagProviderProps) {
  const featureFlags = useFeatureFlags()

  return <FeatureFlagContext.Provider value={featureFlags}>{children}</FeatureFlagContext.Provider>
}

export default FeatureFlagsProvider

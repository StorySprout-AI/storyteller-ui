import { createContext } from 'react'

export * from './useFeatureFlags'

interface FeatureFlagContextType {
  loading: boolean
  flags: Record<string, boolean>
  isEnabled: (key: string) => boolean
}

export const FeatureFlagContext = createContext<FeatureFlagContextType>(null!)

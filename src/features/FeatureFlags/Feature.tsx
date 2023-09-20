import LinearProgress from '@mui/material/LinearProgress'
import React, { useContext } from 'react'
import { FeatureFlagContext } from './useFeatureFlags'

type FeatureProps = {
  flag: string
  children: React.ReactNode
}

export function Feature({ flag, children }: FeatureProps) {
  const { loading, flags, isEnabled } = useContext(FeatureFlagContext)
  const flagExists = flag in flags

  return (
    <>
      {loading && <LinearProgress test-id={`loading_${flag}`} />}
      {flagExists && isEnabled(flag) && children}
    </>
  )
}

export default Feature

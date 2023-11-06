import LinearProgress from '@mui/material/LinearProgress'
import React, { useContext } from 'react'
import { FeatureFlagContext } from './useFeatureFlags'

type FeatureProps = {
  flag: string
  offSwitch?: boolean
  children: React.ReactNode
}

export function Feature({ flag, offSwitch, children }: FeatureProps) {
  const { loading, flags, isEnabled } = useContext(FeatureFlagContext)
  const flagExists = flag in flags
  const showFeature =
    (!flagExists && offSwitch) || (!isEnabled(flag) && offSwitch) || (flagExists && isEnabled(flag) && !offSwitch)

  return (
    <>
      {loading && <LinearProgress test-id={`loading_${flag}`} />}
      {showFeature && children}
    </>
  )
}

export default Feature

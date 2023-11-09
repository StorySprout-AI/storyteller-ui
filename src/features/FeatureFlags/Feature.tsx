import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'
import { useFeatureFlagsContext } from './Provider'

type FeatureProps = {
  flag: string
  offSwitch?: boolean
  children: React.ReactNode
}

export function Feature({ flag, offSwitch, children }: FeatureProps) {
  const { loading, flags, isEnabled } = useFeatureFlagsContext()
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

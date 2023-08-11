import LinearProgress from '@mui/material/LinearProgress'
import React from 'react'
import useFeatureFlags from './useFeatureFlags'

type FeatureProps = {
  flag: string
  children: React.ReactNode
}

export function Feature({ flag, children }: FeatureProps) {
  const { loading, flags, isEnabled } = useFeatureFlags()
  const flagExists = flag in flags

  return (
    <>
      {loading && <LinearProgress test-id={`loading_${flag}`} />}
      {flagExists && isEnabled(flag) && children}
    </>
  )
}

export default Feature

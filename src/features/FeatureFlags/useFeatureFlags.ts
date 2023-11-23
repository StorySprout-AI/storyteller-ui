import React from 'react'
import axios from 'axios'
// import { useGetParams } from 'hooks/useGetParams'
import { useSearchParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { FeatureFlagsHook, FlipperActor, FlipperFeatureSet } from './types'
import { useAuth } from 'components/shared/AuthProvider'

export function useFeatureFlags(): FeatureFlagsHook {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>('')
  const [flags, setFlags] = useState<Record<string, boolean>>({})
  const flipperId = React.useMemo(() => {
    const hardCodedFlipperId = params.get('u')
    if (!!hardCodedFlipperId) return hardCodedFlipperId
    if (!!user) return `User;${user.id}`
    return null
  }, [user, params])

  const loadFlagsForActor = async (flipperId: string) => {
    setLoading(true)
    try {
      const { data } = await axios.get<FlipperActor>(`/api/flipper/actors/${flipperId}`)
      const latestFlags = Object.keys(data.features).reduce(
        (flags, key) => ({
          ...flags,
          [key]: data.features[key].enabled
        }),
        {}
      )
      setFlags(latestFlags)
      console.debug({ latestFlags })
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const loadFlags = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get<FlipperFeatureSet>('/api/flipper/features')
      const { features } = data
      const latestFlags = features.reduce((acc, { key, state }) => {
        return { ...acc, [key]: state === 'on' }
      }, flags)
      setFlags(latestFlags)
      console.debug({ latestFlags })
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const isEnabled = useCallback((key: string) => flags[key], [flags])

  useEffect(() => {
    if (!!flipperId) {
      loadFlagsForActor(flipperId)
    } else loadFlags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipperId])

  return {
    loading,
    error,
    flags,
    loadFlags,
    loadFlagsForActor,
    isEnabled
  }
}

export default useFeatureFlags

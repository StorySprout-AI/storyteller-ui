import axios from 'axios'
import { useGetParams } from 'hooks/useGetParams'
import { createContext, useCallback, useEffect, useState } from 'react'

interface FlipperFeature {
  key: string
  state: 'on' | 'off'
}

interface FlipperFeatureSet {
  features: FlipperFeature[]
}

interface FlipperActor {
  flipper_id: string
  features: {
    [key: string]: { enabled: boolean }
  }
}

interface FeatureFlagContextType {
  loading: boolean
  flags: Record<string, boolean>
  isEnabled: (key: string) => boolean
}

export const FeatureFlagContext = createContext<FeatureFlagContextType>(null!)

export function useFeatureFlags() {
  const params = useGetParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>('')
  const [flags, setFlags] = useState<Record<string, boolean>>({})

  console.debug({ params })

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
      setLoading(false)
      console.debug({ latestFlags })
    } catch (err) {
      console.error(err)
      setError(err)
    }
    setLoading(false)
  }

  const isEnabled = useCallback((key: string) => flags[key], [flags])

  useEffect(() => {
    const { u: flipperId } = params
    if (!!flipperId) {
      loadFlagsForActor(flipperId)
    } else loadFlags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
    flags,
    loadFlags,
    isEnabled
  }
}

export default useFeatureFlags

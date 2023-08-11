import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

interface FlipperFeature {
  key: string
  state: 'on' | 'off'
}

interface FlipperFeaturesResponse {
  features: FlipperFeature[]
}

export function useFeatureFlags() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>('')
  const [flags, setFlags] = useState<Record<string, boolean>>({})

  const loadFlags = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get<FlipperFeaturesResponse>(`${process.env.REACT_APP_API_ENDPOINT}/api/flipper/features`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isEnabled = useCallback((key: string) => flags[key], [flags])

  useEffect(() => {
    loadFlags()
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

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function useURLFragmentParams() {
  const [params, setParams] = useState<Record<string, string>>({})
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const searchParams = new URLSearchParams(location.hash.replace(/^#?/, ''))
      let fragmentParams = {}
      searchParams.forEach((value, key) => {
        fragmentParams = { ...fragmentParams, [key]: value }
      })
      setParams(fragmentParams)
    }
  }, [location.hash])

  return params
}

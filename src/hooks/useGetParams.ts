import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

interface SupportedQueryStringParams {
  // Feature flag ID
  u?: string
}

export function useGetParams(): SupportedQueryStringParams {
  const location = useLocation()
  const params = queryString.parse(location.search)

  return params
}

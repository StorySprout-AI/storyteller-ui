import queryString from 'query-string'

interface SupportedQueryStringParams {
  // Feature flag ID
  u?: string
}

export function useGetParams(): SupportedQueryStringParams {
  console.debug({ 'window.location': window.location })
  const params = queryString.parse(window.location.search)

  return params
}

export default useGetParams

import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'
import tokenizer from 'lib/tokenization'

const isAppServiceRequest = (config: InternalAxiosRequestConfig) => {
  return /^\/api\/v1\//.test(config.url as string)
}

const shouldAuthorizeRequest = (config: InternalAxiosRequestConfig) => {
  // Skip default authorization header for 3rd party requests
  if (!isAppServiceRequest(config)) return false

  // Skip default authorization header for feature flag requests
  if (/\/api\/flipper\/features$/.test(config.url as string)) return false

  // Skip default authorization header for auth token requests
  if (/\/oauth\/token$/.test(config.url as string)) return false

  // Skip default authorization header for OpenAI requests
  if (/:\/\/api\.openai\.com\//.test(config.url as string)) return false

  return !config.headers['X-Skip-Authorization-Header']
}

axios.defaults.baseURL = /\.ngrok\.app$/.test(window.location.host)
  ? process.env.REACT_APP_PROXY_ENDPOINT
  : process.env.REACT_APP_API_ENDPOINT
/**
 * @TODO We need to define an SLA for our service with our FE
 *   that includes the max duration of a request, as well as a
 *   policy for handling request timeouts and retry backoffs
 *   (retries will likely be on a case by case basis - and will
 *   likely require a library like [axios-retry](https://github.com/softonic/axios-retry),
 *   but the handling of errors, capture using an error boundary
 *   as well as logging to BetterStack all need to be implemented) so
 *   we ensure both in our automated tests and in production
 *   that our app is meeting our request performance standards
 */
// axios.defaults.timeout = 1000 // this is in milliseconds

// Add auth interceptor
axios.interceptors.request.use(async (config) => {
  if (shouldAuthorizeRequest(config)) {
    const token = localStorage.getItem('token')
    if (!!token) {
      const decryptedToken = tokenizer.decrypt(token)
      config.headers.Authorization = `Bearer ${decryptedToken}`
    }
  }
  const { url, headers } = config
  console.debug({ headers, url, 'authorize?': shouldAuthorizeRequest(config) })
  return config
})

// Axios middleware to convert all app service API responses to camelCase
axios.interceptors.response.use((response: AxiosResponse) => {
  if (!isAppServiceRequest(response.config)) return response

  if (!!response.data && /^application\/json;?/.test(response.headers['content-type'])) {
    return {
      ...response,
      data: camelizeKeys(response.data)
    }
  }

  return response
})

// Axios middleware to convert all app service API requests to snake_case
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { headers, params, data } = config
  if (headers['Content-Type'] === 'multipart/form-data' || !isAppServiceRequest(config)) return config

  let newConfig = { ...config }
  if (!!params) newConfig.params = decamelizeKeys(params)
  if (!!data) newConfig.data = decamelizeKeys(data)

  return newConfig
})

export default axios

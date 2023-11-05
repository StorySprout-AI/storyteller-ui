import axios, { InternalAxiosRequestConfig } from 'axios'
import tokenizer from 'lib/tokenization'

const shouldAuthorizeRequest = (config: InternalAxiosRequestConfig) => {
  // Skip authorization header for feature flag requests
  if (/\/api\/flipper\/features$/.test(config.url as string)) return false

  // Skip authorization header for auth token requests
  if (/\/oauth\/token$/.test(config.url as string)) return false

  return !!config.headers['X-Skip-Authorization-Header']
}

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT
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
  console.debug({ headers: config.headers })
  return config
})

export default axios

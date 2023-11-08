import jwt_decode from 'jwt-decode'

export default function useTokenHelpers() {
  // Remove the token and user from localStorage
  const clearCredentials = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // TODO: break down as function in useTokenHelpers hook
  // Helper function to check if the token is valid
  const isTokenValid = (token: string) => {
    // Check if token is not expired
    const decodedPayload = jwt_decode(token) as { exp: number }

    if (decodedPayload.exp < Date.now() / 1000) {
      // Check if there is a refresh token in localStorage
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        /**
         * TODO: look into the effect of calling isTokenValid in a synchronous context
         *   with async refreshAccessToken implemented here
         */
        // // Refresh the access token
        // refreshAccessToken()

        return true
      } else {
        return false
      }
    }

    // Token is valid
    return true
  }

  return { clearCredentials, isTokenValid }
}

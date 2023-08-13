import React, { createContext, ReactNode, useContext } from 'react'
import useUser, { User } from 'hooks/useUser'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Example project: https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx

export interface AuthContextType {
  loading: boolean
  user: User | null
  signOut: (callback: VoidFunction) => Promise<void>
  // signIn: () => void
  isLoggedIn: boolean
}

let AuthContext = createContext<AuthContextType>(null!)

type WithRequiredChildren<T = any> = T & { children: ReactNode }

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthStatus() {
  let auth = useAuth()
  let navigate = useNavigate()

  if (!auth.user) {
    return <p>Login to continue</p>
  }

  return (
    <>
      Hello {auth.user.name}!{' '}
      <button
        onClick={() => {
          auth.signOut(() => navigate('/'))
        }}
      >
        Sign out
      </button>
    </>
  )
}

export function RequireAuth({ children }: WithRequiredChildren) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default function AuthProvider({ children }: WithRequiredChildren) {
  const { loading, user, isLoggedIn } = useUser()

  const signOut = async (callback: VoidFunction) => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    // window.location.reload()
    callback()
  }

  return (
    <AuthContext.Provider value={{ loading, user, signOut, isLoggedIn }}>
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>{children}</GoogleOAuthProvider>
    </AuthContext.Provider>
  )
}

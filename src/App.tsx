import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import StoryGenerator from './features/PagedStory/v0'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import useUser from './hooks/useUser'
import { useFeatureFlags, FeatureFlagContext } from 'features/FeatureFlags'

function App() {
  const { loading, flags, isEnabled } = useFeatureFlags()
  const { isLoggedIn } = useUser()

  return (
    <FeatureFlagContext.Provider value={{ loading, flags, isEnabled }}>
      <Router>
        <div className="App">
          <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
            {isLoggedIn ? <StoryGenerator /> : <Login />}
          </GoogleOAuthProvider>
        </div>
      </Router>
    </FeatureFlagContext.Provider>
  )
}

export default App

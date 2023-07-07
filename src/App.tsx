import React, { useState } from 'react'
import './App.css'
import StoryGenerator from './components/StoryGenerator'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
        <StoryGenerator />
        {/* <Login /> */}
      </GoogleOAuthProvider>
    </div>
  )
}

export default App

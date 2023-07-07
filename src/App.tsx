import React, { useState } from 'react'
import './App.css'
import StoryGenerator from './components/StoryGenerator'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import useUser from './hooks/useUser'

function App() {
  const { user, isLoggedIn } = useUser()

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
        {isLoggedIn ? <StoryGenerator /> : <Login />}
      </GoogleOAuthProvider>
    </div>
  )
}

export default App

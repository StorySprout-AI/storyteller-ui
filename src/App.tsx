import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import StoryGenerator from './features/PagedStory/v0'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import useUser from './hooks/useUser'

function App() {
  const { isLoggedIn } = useUser()

  return (
    <Router>
      <div className="App">
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
          {isLoggedIn ? <StoryGenerator /> : <Login />}
        </GoogleOAuthProvider>
      </div>
    </Router>
  )
}

export default App

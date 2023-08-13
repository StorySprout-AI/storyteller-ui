import React from 'react'
import './App.css'
import Login from './components/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthProvider, { RequireAuth } from 'components/shared/AuthProvider'

import StoryGenerator from './features/PagedStory/v0'
import StoryGeneratorV1 from './features/PagedStory/v1'
import Layout from 'features/PagedStory/v1/components/Layout'

function App() {
  // TODO: Get FE app routes def to be more dry by using createBrowserRouter: https://reactrouter.com/en/main/routers/create-browser-router
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/v1">
              <Route element={<Layout />}>
                <Route
                  path="stories/:action"
                  element={
                    <RequireAuth>
                      <StoryGeneratorV1 />
                    </RequireAuth>
                  }
                />
                <Route index element={<Navigate to="stories/new" />} />
              </Route>
            </Route>
            <Route path="/v0">
              <Route
                path="stories/:action"
                element={
                  <RequireAuth>
                    <StoryGenerator />
                  </RequireAuth>
                }
              />
              <Route index element={<Navigate to="stories/new" />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

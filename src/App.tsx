import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { useFeatureFlags, FeatureFlagContext } from 'features/FeatureFlags'
import StoryGenerator from 'features/PagedStory/v0'
import StoryGeneratorV1 from 'features/PagedStory/v1'
import Layout from 'features/PagedStory/v1/components/Layout'

import AuthProvider, { RequireAuth } from 'components/shared/AuthProvider'

import Home from 'components/Home'
import Login from 'components/Login'

import './App.css'

function App() {
  const { loading, flags, isEnabled } = useFeatureFlags()
  // TODO: Get FE app routes def to be more dry by using createBrowserRouter: https://reactrouter.com/en/main/routers/create-browser-router
  return (
    <div className="App">
      <BrowserRouter>
        <CookiesProvider>
          <FeatureFlagContext.Provider value={{ loading, flags, isEnabled }}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
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
          </FeatureFlagContext.Provider>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

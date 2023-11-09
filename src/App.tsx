import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import AppProgress from 'features/AppProgress'
import FeatureFlags from 'features/FeatureFlags'
import StoryGenerator from 'features/PagedStory/v0'
import StoryGeneratorV1 from 'features/PagedStory/v1'
import Layout from 'features/PagedStory/v1/components/Layout'

import AuthProvider, { RequireAuth } from 'components/shared/AuthProvider'
import PageLayout from 'components/shared/PageLayout'

import Home from 'components/Home'
import Login from 'components/Login'
import TermsOfUse from 'components/TermsOfUse'
import PrivacyPolicy from 'components/PrivacyPolicy'

// Initialize axios setup
import 'lib/axios'

import './App.css'

function App() {
  // TODO: Get FE app routes def to be more dry by using createBrowserRouter: https://reactrouter.com/en/main/routers/create-browser-router
  return (
    <div className="App">
      <BrowserRouter>
        <CookiesProvider>
          <AppProgress.Provider>
            <AuthProvider>
              <FeatureFlags.Provider>
                <Routes>
                  <Route element={<PageLayout />}>
                    <Route path="/legal/privacy" element={<PrivacyPolicy />} />
                    <Route path="/legal/terms" element={<TermsOfUse />} />
                  </Route>
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
                  <Route path="/" element={<Home />} />
                </Routes>
              </FeatureFlags.Provider>
            </AuthProvider>
          </AppProgress.Provider>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

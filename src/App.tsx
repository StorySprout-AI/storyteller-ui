import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import DevTools from 'features/DevTools'
import { FeatureFlagProvider } from 'features/FeatureFlags'
import StoryGenerator from 'features/PagedStory/v0'
import StoryGeneratorV1 from 'features/PagedStory/v1'
import Layout from 'features/PagedStory/v1/components/Layout'

import AuthProvider, { RequireAuth } from 'components/shared/AuthProvider'
import PageLayout from 'components/shared/PageLayout'

import Home from 'components/Home'
import Login from 'components/Login'
import TermsOfUse from 'components/TermsOfUse'
import PrivacyPolicy from 'components/PrivacyPolicy'

import './App.css'

function App() {
  // TODO: Get FE app routes def to be more dry by using createBrowserRouter: https://reactrouter.com/en/main/routers/create-browser-router
  return (
    <div className="App">
      <BrowserRouter>
        <CookiesProvider>
          <FeatureFlagProvider>
            <AuthProvider>
              <DevTools.Provider>
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
                <DevTools.Drawer />
              </DevTools.Provider>
            </AuthProvider>
          </FeatureFlagProvider>
        </CookiesProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

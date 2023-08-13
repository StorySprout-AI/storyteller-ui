import React from 'react'
import './App.css'
import Login from './components/Login'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import AuthProvider, { RequireAuth } from 'components/shared/AuthProvider'

import StoryGenerator from './features/PagedStory/v0'
import StoryGeneratorV1 from './features/PagedStory/v1'

function Layout() {
  return (
    <div className="App">
      <Outlet />
    </div>
  )
}

function App() {
  // TODO: Get FE app routes def to be more dry by using createBrowserRouter: https://reactrouter.com/en/main/routers/create-browser-router
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/v1">
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
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

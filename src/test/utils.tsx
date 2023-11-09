import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FeatureFlags from 'features/FeatureFlags'
import AppProgress from 'features/AppProgress'
import AuthProvider from 'components/shared/AuthProvider'

// For notes on updating the wrapper: https://testing-library.com/docs/react-testing-library/setup
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgress.Provider>
      <AuthProvider>
        <FeatureFlags.Provider>{children}</FeatureFlags.Provider>
      </AuthProvider>
    </AppProgress.Provider>
  )
}

// For notes on updating the wrapper: https://testing-library.com/docs/react-testing-library/setup
const RouterWithAllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <AppProgress.Provider>
        <AuthProvider>
          <FeatureFlags.Provider>{children}</FeatureFlags.Provider>
        </AuthProvider>
      </AppProgress.Provider>
    </MemoryRouter>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const renderInMemoryRouter = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: RouterWithAllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render, renderInMemoryRouter }

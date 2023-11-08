import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { FeatureFlagProvider } from 'features/FeatureFlags'
import DevTools from 'features/DevTools'
import AppProgress from 'features/AppProgress'

// For notes on updating the wrapper: https://testing-library.com/docs/react-testing-library/setup
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgress.Provider>
      <FeatureFlagProvider>
        <DevTools.Provider>{children}</DevTools.Provider>
      </FeatureFlagProvider>
    </AppProgress.Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import FeatureFlags from 'features/FeatureFlags'
import DevTools from 'features/DevTools'
import AppProgress from 'features/AppProgress'

// For notes on updating the wrapper: https://testing-library.com/docs/react-testing-library/setup
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgress.Provider>
      <FeatureFlags.Provider>
        <DevTools.Provider>{children}</DevTools.Provider>
      </FeatureFlags.Provider>
    </AppProgress.Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }

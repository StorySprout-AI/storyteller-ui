import React from 'react'

export interface AppProgressContextType {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

let AppProgressContext = React.createContext<AppProgressContextType>(null!)

export function useAppProgress() {
  return React.useContext(AppProgressContext)
}

export function AppProgressProvider({ children }: { children: React.ReactNode }) {
  let [loading, setLoading] = React.useState(false)

  return <AppProgressContext.Provider value={{ loading, setLoading }}>{children}</AppProgressContext.Provider>
}

export default AppProgressProvider

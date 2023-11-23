import React from 'react'

type DrawerControlFn = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export type DevToolsContextType = {
  open: boolean
  toggleDrawer: DrawerControlFn
  autoClickButtonRef: React.MutableRefObject<HTMLButtonElement>
  /**
   * @deprecated Unless we get another use case for capturing the main button
   *   used to toggle the drawer, we probably don't need to keep this
   */
  useAutoClickButton: () => HTMLButtonElement
}

const DevToolsContext = React.createContext<DevToolsContextType>(null!)

type DevToolsProviderProps = {
  children: React.ReactNode
}

export function useDevToolsContext() {
  return React.useContext(DevToolsContext)
}

export function DevToolsProvider({ children }: DevToolsProviderProps) {
  const [open, setOpen] = React.useState(() => false)
  const autoClickButtonRef = React.useRef<HTMLButtonElement>(null!)

  const toggleDrawer: DrawerControlFn = (_anchor, isOpen) => (_event) => {
    setOpen(isOpen)
  }

  React.useEffect(() => {
    if (!!autoClickButtonRef.current)
      console.debug('Got a ref for the main drawer toggle button!', autoClickButtonRef.current)
  }, [autoClickButtonRef])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useAutoClickButton = React.useCallback(() => autoClickButtonRef.current, [autoClickButtonRef?.current])

  return (
    <DevToolsContext.Provider value={{ open, toggleDrawer, autoClickButtonRef, useAutoClickButton }}>
      {children}
    </DevToolsContext.Provider>
  )
}

export default DevToolsProvider

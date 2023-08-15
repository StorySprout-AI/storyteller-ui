import React, { ReactNode, createContext, useState, useEffect, useRef, MutableRefObject, useCallback } from 'react'

export type DrawerControlFn = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export type StoryBuilderContextType = {
  open: boolean
  toggleDrawer: DrawerControlFn
  autoClickButtonRef: MutableRefObject<HTMLButtonElement>
  /**
   * @deprecated Unless we get another use case for capturing the main button
   *   used to toggle the drawer, we probably don't need to keep this
   */
  useAutoClickButton: () => HTMLButtonElement
}

export const StoryBuilderContext = createContext<StoryBuilderContextType>(null!)

type StoryBuilderProviderProps = {
  children: ReactNode
}

export default function Provider({ children }: StoryBuilderProviderProps) {
  const [open, setOpen] = useState(() => true)
  const autoClickButtonRef = useRef<HTMLButtonElement>(null!)

  const toggleDrawer: DrawerControlFn = (_anchor, isOpen) => (_event) => {
    /**
     * TODO: It seems we disabled all the checks for a swipeable edge.
     *   Look into why that is https://mui.com/material-ui/react-drawer/#swipeable-edge
     */
    // if (
    //   event &&
    //   event.type === 'keydown' &&
    //   ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    // ) {
    //   return
    // }

    setOpen(isOpen)
  }

  useEffect(() => {
    if (!!autoClickButtonRef.current)
      console.debug('Got a ref for the main drawer toggle button!', autoClickButtonRef.current)
  }, [autoClickButtonRef])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useAutoClickButton = useCallback(() => autoClickButtonRef.current, [autoClickButtonRef?.current])

  return (
    <StoryBuilderContext.Provider value={{ open, toggleDrawer, autoClickButtonRef, useAutoClickButton }}>
      {children}
    </StoryBuilderContext.Provider>
  )
}

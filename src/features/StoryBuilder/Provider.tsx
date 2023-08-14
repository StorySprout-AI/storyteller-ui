import React, { ReactNode, createContext, useState, useEffect } from 'react'

export type DrawerControlFn = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export type StoryBuilderContextType = {
  open: boolean
  toggleDrawer: DrawerControlFn
}

export const StoryBuilderContext = createContext<StoryBuilderContextType>(null!)

type StoryBuilderProviderProps = {
  children: ReactNode
}

export default function Provider({ children }: StoryBuilderProviderProps) {
  const [open, setOpen] = useState(() => true)

  const toggleDrawer: DrawerControlFn = (_anchor, isOpen) => (event) => {
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
    console.debug(`Attempted to toggle drawer "open" to: ${open}`)
  }, [open])

  return <StoryBuilderContext.Provider value={{ open, toggleDrawer }}>{children}</StoryBuilderContext.Provider>
}

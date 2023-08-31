import React from 'react'
import { Outlet } from 'react-router-dom'

import StoryBuilder from 'features/StoryBuilder'
import withRoot from 'themes/onepirate/modules/withRoot'
import { ResponsiveAppBar } from '../modules/views/AppBar'

function Layout() {
  return (
    <StoryBuilder.Provider>
      <ResponsiveAppBar />
      <Outlet />
    </StoryBuilder.Provider>
  )
}

export default withRoot(Layout)

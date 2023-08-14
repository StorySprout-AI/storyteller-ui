import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import StoryBuilder from 'features/StoryBuilder'
import withRoot from 'features/PagedStory/v1/modules/withRoot'
import { ResponsiveAppBar } from '../modules/views/AppBar'

function Layout() {
  return (
    <StoryBuilder.Provider>
      <ResponsiveAppBar />
      {/* <Box
        sx={{
          // backgroundColor: '#f5f5f5',
          // minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <Outlet />
      </Box> */}
      <Outlet />
    </StoryBuilder.Provider>
  )
}

export default withRoot(Layout)

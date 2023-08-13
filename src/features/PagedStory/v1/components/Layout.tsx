import React from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import withRoot from 'features/PagedStory/v1/modules/withRoot'
import { ResponsiveAppBar } from '../modules/views/AppBar'
import { StoryBuilderProvider } from './StoryBuilder'

function Layout() {
  return (
    <StoryBuilderProvider>
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
    </StoryBuilderProvider>
  )
}

export default withRoot(Layout)

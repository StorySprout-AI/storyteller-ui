import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

import { useDevToolsContext } from 'features/DevTools'
import Feature from 'features/FeatureFlags/Feature'

import featureFlags from 'lib/features'

type NavBarProps = {
  handleLogout: () => void
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  const { toggleDrawer: toggleDevToolsDrawer } = useDevToolsContext()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to StorySprout!
        </Typography>
        <Box>
          <Feature flag={featureFlags.HOME_PAGE}>
            <Button color="inherit">Home</Button>
          </Feature>
          <Feature flag={featureFlags.ABOUT_PAGE}>
            <Button color="inherit">About</Button>
          </Feature>
          <Button color="inherit" onClick={toggleDevToolsDrawer('bottom', true)}>
            Testing Tools
          </Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

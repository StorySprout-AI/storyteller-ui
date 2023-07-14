import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'

type NavBarProps = {
  handleLogout: () => void
}

const NavBar: React.FC<NavBarProps> = ({ handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to StorySprout!
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

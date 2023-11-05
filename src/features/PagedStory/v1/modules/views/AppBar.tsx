import React from 'react'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
// import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import BookIcon from '@mui/icons-material/Book'
import styled from '@mui/system/styled'
// // Problems? Try this alt syntax
// import styled from '@mui/material/styles/styled'
import StoryBuilder from 'features/StoryBuilder'
import Feature from 'features/FeatureFlags/Feature'
import DevTools from 'features/DevTools'

import { AuthStatus, useAuth } from 'components/shared/AuthProvider'

import featureFlags from 'lib/features'

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70
  }
}))

export function AppBar(props: AppBarProps) {
  return (
    <div>
      <MuiAppBar elevation={0} position="fixed" {...props}>
        {props.children}
      </MuiAppBar>
      <Toolbar />
    </div>
  )
}

interface AppFeature {
  label: string
  path: string
  flag: string
}

const pages: AppFeature[] = [
  { label: 'Home', path: '/', flag: featureFlags.HOME_PAGE },
  { label: 'About', path: '/about', flag: featureFlags.ABOUT_PAGE }
]
const settings: AppFeature[] = [
  {
    label: 'Profile',
    path: '/profile',
    flag: featureFlags.PROFILE
  },
  {
    label: 'Account',
    path: '/account',
    flag: featureFlags.ACCOUNT
  },
  {
    label: 'Your Library',
    path: '/library',
    flag: featureFlags.LIBRARY
  }
]

export function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const auth = useAuth()
  const storyBuilder = StoryBuilder.useContext()
  const devTools = DevTools.useContext()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleSignOutMenu = async (event: React.MouseEvent<HTMLElement>) => {
    await auth.signOut()
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenTestingTools = (event: React.MouseEvent<HTMLElement>) => {
    devTools.toggleDrawer('bottom', true)(event)
    setAnchorElUser(null)
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Icon & Logo */}
          <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            StorySprout
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <Feature key={page.label} flag={page.flag}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Feature>
              ))}
            </Menu>
          </Box>

          <BookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            StorySprout
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <AuthStatus />
          </Box>

          {/* Page Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            <Button
              data-testid="new-story.appbar.btn"
              key="function--new-story"
              ref={storyBuilder.autoClickButtonRef}
              onClick={storyBuilder.toggleDrawer('bottom', true)}
              sx={{ my: 2, color: 'secondary.main', display: 'block' }}
            >
              New Story
            </Button>
            {pages.map((page) => (
              <Feature flag={page.flag} key={page.label}>
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              </Feature>
            ))}
            &nbsp;
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Feature key={setting.label} flag={setting.flag}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                </Feature>
              ))}
              <MenuItem key="menu--dev-tools" onClick={handleOpenTestingTools}>
                <Typography textAlign="center">Testing tools</Typography>
              </MenuItem>
              <MenuItem key="menu--sign-out" onClick={handleSignOutMenu}>
                <Typography textAlign="center">Sign out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

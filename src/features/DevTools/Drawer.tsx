import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Global } from '@emotion/react'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import TitleTextBox from 'components/shared/TitleTextBox'

import styled from '@mui/system/styled'
import { grey } from '@mui/material/colors'
import withRoot from 'themes/onepirate/modules/withRoot'

import { useDevToolsContext } from './Provider'
import useAccessToken from 'hooks/useAccessToken'

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}))

type DevToolsDrawerProps = Omit<DrawerProps, 'children'> & {
  anchor?: DrawerProps['anchor']
}

export function DevToolsDrawer({ anchor = 'bottom', ...rest }: DevToolsDrawerProps) {
  const { open, toggleDrawer } = useDevToolsContext()
  const {
    loading: loadingCredentials,
    accessToken,
    refreshAccessToken,
    refresh: sendTokenRefreshRequest,
    tokenizedUser
  } = useAccessToken()

  React.useEffect(() => {
    if (open) sendTokenRefreshRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  console.debug({ toolIsOpen: open, tokenizedUser, accessToken, refreshAccessToken })

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(40%)`,
            overflow: 'visible',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            border: '1px solid #2a2a2a'
          }
        }}
      />
      <Drawer {...rest} anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
        <TitleTextBox>Testing Tools</TitleTextBox>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '1.5rem', md: '40px' },
            overflow: 'scroll'
          }}
        >
          <TextField
            label="Tokenized User"
            variant="outlined"
            margin="normal"
            multiline
            value={JSON.stringify(tokenizedUser, null, 2)}
            disabled
            fullWidth
          />

          <TextField
            label="Access Token"
            variant="outlined"
            margin="normal"
            multiline
            value={loadingCredentials ? 'Loading...' : accessToken ?? ''}
            disabled
            fullWidth
          />

          <TextField
            label="Refresh Token"
            variant="outlined"
            margin="normal"
            multiline
            value={loadingCredentials ? 'Loading...' : refreshAccessToken ?? ''}
            disabled
            fullWidth
          />
        </Box>
      </Drawer>
    </Root>
  )
}

export default withRoot(DevToolsDrawer)

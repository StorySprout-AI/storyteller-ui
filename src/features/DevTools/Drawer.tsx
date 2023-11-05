import React from 'react'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import TitleTextBox from 'components/shared/TitleTextBox'

import withRoot from 'themes/onepirate/modules/withRoot'

import { useDevToolsContext } from './Provider'
import useAccessToken from 'hooks/useAccessToken'

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
  )
}

export default withRoot(DevToolsDrawer)

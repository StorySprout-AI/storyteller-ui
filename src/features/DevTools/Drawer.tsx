import React from 'react'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import noop from 'lodash/noop'
import { useFormik } from 'formik'

import TitleTextBox from 'components/shared/TitleTextBox'

import withRoot from 'themes/onepirate/modules/withRoot'

import { useDevToolsContext } from './Provider'
import useAccessToken from 'hooks/useAccessToken'

import { formatDateInSecondsForDisplay } from 'lib/day'
import StackableItem from 'components/shared/StackableItem'

type DevToolsDrawerProps = Omit<DrawerProps, 'children'> & {
  anchor?: DrawerProps['anchor']
}

interface DevToolFormValues {
  accessToken: string
  refreshToken: string
  tokenizedUser: string
  tokenIssued: string
  tokenExpires: string
}

export function DevToolsDrawer({ anchor = 'bottom', ...rest }: DevToolsDrawerProps) {
  const { open, toggleDrawer } = useDevToolsContext()
  const {
    loading: loadingCredentials,
    accessToken,
    refreshToken,
    refresh: sendTokenRefreshRequest,
    tokenizedUser
  } = useAccessToken()

  const handleSelectAllOnFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => event.target.select(),
    []
  )

  const formik = useFormik<DevToolFormValues>({
    initialValues: {
      accessToken: 'Loading...',
      refreshToken: 'Loading...',
      tokenizedUser: 'Loading...',
      tokenIssued: 'Loading...',
      tokenExpires: 'Loading...'
    },
    onSubmit: noop
  })

  React.useEffect(() => {
    if (!loadingCredentials) {
      formik.setFieldValue('accessToken', accessToken ?? '')
      formik.setFieldValue('refreshToken', refreshToken ?? '')
      formik.setFieldValue('tokenizedUser', JSON.stringify(tokenizedUser, null, 2))
      formik.setFieldValue('tokenIssued', formatDateInSecondsForDisplay(tokenizedUser?.iat))
      formik.setFieldValue('tokenExpires', formatDateInSecondsForDisplay(tokenizedUser?.exp))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCredentials, accessToken, refreshToken, tokenizedUser])

  React.useEffect(() => {
    if (open) sendTokenRefreshRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  console.debug({ toolIsOpen: open, tokenizedUser, accessToken, refreshToken })

  return (
    <Drawer {...rest} anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
      <TitleTextBox>Testing / Dev Tools</TitleTextBox>
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
        <Grid container spacing={1}>
          <StackableItem sm={6} md={6}>
            <TextField
              label="Token Issued"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.tokenIssued}
              inputProps={{ readOnly: true }}
            />
          </StackableItem>
          <StackableItem sm={6} md={6}>
            <TextField
              label="Token Expires"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.tokenExpires}
              inputProps={{ readOnly: true }}
            />
          </StackableItem>
        </Grid>
        <TextField
          label="Tokenized User"
          variant="outlined"
          margin="normal"
          multiline
          fullWidth
          value={formik.values.tokenizedUser}
          inputProps={{ readOnly: true }}
        />

        <TextField
          label="Access Token"
          variant="outlined"
          margin="normal"
          multiline
          fullWidth
          value={formik.values.accessToken}
          onFocus={handleSelectAllOnFocus}
          inputProps={{ readOnly: true }}
        />

        <TextField
          label="Refresh Token"
          variant="outlined"
          margin="normal"
          multiline
          fullWidth
          value={formik.values.refreshToken}
          onFocus={handleSelectAllOnFocus}
          inputProps={{ readOnly: true }}
        />
      </Box>
    </Drawer>
  )
}

export default withRoot(DevToolsDrawer)

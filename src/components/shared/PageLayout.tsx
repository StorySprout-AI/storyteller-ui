import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router-dom'

import withRoot from 'themes/onepirate/modules/withRoot'
import AppFooter from 'components/AppFooter'

function PageLayout() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Outlet />
      </Container>
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(PageLayout)

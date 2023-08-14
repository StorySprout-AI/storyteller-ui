// Swipeable edge drawer: https://mui.com/material-ui/react-drawer/#swipeable-edge
import React, { useContext, useEffect, ReactNode } from 'react'
import SwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import { Global } from '@emotion/react'

import styled from '@mui/system/styled'
import { grey } from '@mui/material/colors'

import { StoryBuilderContext } from 'features/StoryBuilder/Provider'

import withRoot from 'features/PagedStory/v1/modules/withRoot'

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}))

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}))

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}))

type StoryBuilderProps = Omit<SwipeableDrawerProps, 'onClose' | 'onOpen'> & {
  header?: ReactNode
}

const drawerBleeding = 56

function Drawer({ anchor = 'bottom', children, header, ...rest }: StoryBuilderProps) {
  const { open, toggleDrawer } = useContext(StoryBuilderContext)

  useEffect(() => {
    console.debug(`"Story builder drawer is open?": ${open}`)
  }, [open])

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            /**
             * Tinker with the % here for the size of the drawer when it
             * is opened
             */
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible'
          }
        }}
      />
      <SwipeableDrawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }}
        {...rest}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            border: '1px solid #2a2a2a',
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{!!header ? header : <span>&nbsp;</span>}</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto'
          }}
        >
          {children}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  )
}

export default withRoot(Drawer)

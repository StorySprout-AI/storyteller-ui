import React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

interface LoadingAnimationProps {
  circular?: boolean
  children?: React.ReactNode
}

export default function LoadingAnimation({ circular, children }: LoadingAnimationProps) {
  return (
    <Box
      sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
    >
      {children && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          {children}
        </Typography>
      )}
      {circular ? (
        <CircularProgress />
      ) : (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      )}
    </Box>
  )
}

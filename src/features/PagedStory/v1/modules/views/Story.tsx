import React, { useState } from 'react'

import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import Button from '../../components/Button'

import withRoot from '../withRoot'

type StoryProps = BoxProps & {
  loading?: boolean
  pages: string[]
}

function Story({ pages, loading }: StoryProps) {
  const [currentStoryPage, setCurrentStoryPage] = useState(0)

  const goToNextPage = () => {
    setCurrentStoryPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentStoryPage((prevPage) => prevPage - 1)
  }

  if (loading) {
    return <LinearProgress variant="indeterminate" />
  } else if (!pages.length) {
    return <></>
  }

  return (
    <>
      <Box
        sx={{
          gridColumn: '1 / span 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          // m: 2,
          p: 2,
          // border: '1px solid black',
          // borderRadius: '5px',
          bgcolor: '#f7f7f7',
          minHeight: '92vh'
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Your Generated Story:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
            maxWidth: 600
          }}
        >
          <Typography sx={{ whiteSpace: 'pre-line' }}>{pages[currentStoryPage]}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button variant="contained" onClick={goToPreviousPage} disabled={currentStoryPage === 0}>
            Previous Page
          </Button>
          <Button variant="contained" onClick={goToNextPage} disabled={currentStoryPage === pages.length - 1}>
            Next Page
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default withRoot(Story)

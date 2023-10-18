import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styled from '@mui/system/styled'

import random from 'lodash/random'

export interface StoryBuilderStatusProps {
  loading: boolean
  storiesAvailable: boolean
}

// TODO: We can test the performance of these prompts
export const CTAMessageOptions = [
  "What's your story about today?",
  'Prompt a new story',
  'Choose your story adventure',
  "Let's make a new tale",
  "Let's build a new story"
]

const pickARandomCTAPrompt = () => {
  const pickIndex = random(0, CTAMessageOptions.length - 1, false)
  return CTAMessageOptions[pickIndex]
}

const ResponsiveTextBox = styled(Box)`
  h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1rem;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
    @media (min-width: 600px, max-width: 960px) {
      font-size: 1.2rem;
    }
    @media (min-width: 960px) {
      font-size: 1.5rem;
    }
  }
`

const StatusTitleTextBox = ({ children }: { children: ReactNode }) => {
  return (
    // <Box sx={{ display: 'flex', flexDirection: 'row', p: 1, justifyContent: 'center' }}>
    //   <Typography fontWeight="400" fontSize={26} sx={{ color: 'text.secondary' }}>
    //     {children}
    //   </Typography>
    // </Box>

    <ResponsiveTextBox>
      <Typography variant="h4">{children}</Typography>
    </ResponsiveTextBox>
  )
}

export default function Status({ loading, storiesAvailable }: StoryBuilderStatusProps) {
  const [ctaText] = React.useState(() => pickARandomCTAPrompt())

  if (loading) {
    return (
      <StatusTitleTextBox>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>One moment, while we build your story...</Box>
        <Box sx={{ display: { sm: 'none' } }}>Working...</Box>
      </StatusTitleTextBox>
    )
  }

  return (
    <StatusTitleTextBox>
      {!!storiesAvailable && <span>Your story is ready</span>}
      {!storiesAvailable && <span>{ctaText}</span>}
    </StatusTitleTextBox>
  )
}

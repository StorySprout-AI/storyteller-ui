import React from 'react'
import Typography from '@mui/material/Typography'
import ResponsiveTextBox from './ResponsiveTextBox'

export default function TitleTextBox({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveTextBox>
      <Typography variant="h4">{children}</Typography>
    </ResponsiveTextBox>
  )
}

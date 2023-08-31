import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

export default function Logo({ sx, ...props }: TypographyProps) {
  return (
    <Typography
      variant={props.variant ?? 'h6'}
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display: 'flex',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        ...sx
      }}
    >
      StorySprout
    </Typography>
  )
}

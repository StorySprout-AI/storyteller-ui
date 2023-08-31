import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

export default function Logo({ sx, variant, ...props }: TypographyProps) {
  return (
    <Typography
      {...props}
      variant={variant ?? 'h6'}
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

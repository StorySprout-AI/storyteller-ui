import React from 'react'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import BookIcon from '@mui/icons-material/Book'

export default function Logo({ sx, variant, ...props }: TypographyProps) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
    </Box>
  )
}

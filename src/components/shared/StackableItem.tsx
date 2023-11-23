import React from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'

export default function StackableItem({ children, ...otherProps }: GridProps) {
  return (
    <Grid item padding={1} xs={12} md={4} {...otherProps}>
      {children && (
        <FormControl variant="outlined" fullWidth>
          {children}
        </FormControl>
      )}
    </Grid>
  )
}

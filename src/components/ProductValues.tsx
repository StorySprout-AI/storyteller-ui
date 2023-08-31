import * as React from 'react'
import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from 'themes/onepirate/components/Typography'

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5
}

function ProductValues() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}>
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                More Adventures Than a Pirate&apos;s Treasure Chest
              </Typography>
              <Typography variant="h5">
                Whether you&apos;re sneaking a story break during the day or winding down at bedtime, our stories are
                like your secret portal to a land of never-ending fun.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/static/themes/onepirate/productValues2.svg" alt="graph" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                It&apos;s Magic!
              </Typography>
              <Typography variant="h5">
                StorySprout uses the magic of AI to whip up awesome short stories that kids of all ages will love.
                It&apos;s like having a story buddy that&apos;s always up for an adventure!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="/static/themes/onepirate/productValues3.svg" alt="clock" sx={{ height: 55 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Inspired by a love of storytelling
              </Typography>
              <Typography variant="h5">
                We&apos;re dedicated to continuously improving StorySprout and keeping it a safe, enjoyable experience
                for the kids in our lives and yours.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProductValues

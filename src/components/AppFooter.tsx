import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Typography from 'themes/onepirate/components/Typography'
import TextField from 'themes/onepirate/components/TextField'
import Feature from 'features/FeatureFlags/Feature'

import featureFlags from 'lib/features'

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://storysprout.app/">
        StorySprout AI
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  )
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark'
  }
}

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English'
  }
]

export default function AppFooter() {
  return (
    <Typography component="footer" sx={{ display: 'flex', bgcolor: 'secondary.light' }}>
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid container direction="column" justifyContent="flex-start" spacing={2} sx={{ height: 120 }}>
              <Feature flag={featureFlags.SOCIAL_LINKS}>
                <Grid item sx={{ display: 'flex' }}>
                  <Box component="a" href="https://mui.com/" sx={iconStyle}>
                    <img src="/static/themes/onepirate/appFooterFacebook.png" alt="Facebook" />
                  </Box>
                  <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                    <img src="/static/themes/onepirate/appFooterTwitter.png" alt="Twitter" />
                  </Box>
                </Grid>
              </Feature>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="none" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/legal/terms">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/legal/privacy">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Feature flag={featureFlags.SITE_TRANSLATION}>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" marked="none" gutterBottom>
                Language
              </Typography>
              <TextField
                select
                size="medium"
                variant="standard"
                SelectProps={{
                  native: true
                }}
                sx={{ mt: 1, width: 150 }}
              >
                {LANGUAGES.map((language) => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Feature>
          <Grid item>
            <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}

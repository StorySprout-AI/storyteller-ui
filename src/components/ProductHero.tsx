import * as React from 'react'
import Button from 'themes/onepirate/components/Button'
import Typography from 'themes/onepirate/components/Typography'
import ProductHeroLayout from 'themes/onepirate/modules/views/ProductHeroLayout'

import random from 'lodash/random'

const BACKGROUND_IMAGES = [
  {
    url: '/static/backgrounds/pexels-ron-lach-9873933.jpg',
    artist: 'Ron Lach',
    artistUrl: 'https://www.pexels.com/@ron-lach-138939'
  },
  {
    url: '/static/backgrounds/pexels-dziana-hasanbekava-8213262.jpg',
    artist: 'Dziana Hasanbekava',
    artistUrl: 'https://www.pexels.com/@dziana-hasanbekava-1178533'
  },
  {
    url: '/static/backgrounds/pexels-cottonbro-studio-5895052.jpg',
    artist: 'cottonbro studio',
    artistUrl: 'https://www.pexels.com/@cottonbro'
  },
  {
    url: '/static/backgrounds/pexels-tima-miroshnichenko-5951837.jpg',
    artist: 'Tima Miroshnichenko',
    artistUrl: 'https://www.instagram.com/tima_miroshnichenko'
  }
]

function randomBackgroundImage() {
  const pick = random(0, BACKGROUND_IMAGES.length - 1)
  return BACKGROUND_IMAGES[pick]
}

export default function ProductHero() {
  const [backgroundImage] = React.useState(() => randomBackgroundImage())
  const backgroundImageUrl = React.useMemo(() => backgroundImage.url, [backgroundImage])

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImageUrl} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Upgrade your Sundays
      </Typography>
      <Typography color="inherit" align="center" variant="h5" sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}>
        Welcome to a treasure trove of stories that never runs out!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Get Started
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Your storytime is about to get an upgrade
      </Typography>
    </ProductHeroLayout>
  )
}

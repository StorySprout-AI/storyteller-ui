import React from 'react'
import withRoot from 'themes/onepirate/modules/withRoot'
import ProductHero from './ProductHero'
import ProductHowItWorks from './ProductHowItWorks'
import ProductValues from './ProductValues'

function Home() {
  return (
    <>
      <ProductHero />
      <ProductValues />
      <ProductHowItWorks />
    </>
  )
}

export default withRoot(Home)

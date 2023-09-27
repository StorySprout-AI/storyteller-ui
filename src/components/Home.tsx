import React from 'react'
import withRoot from 'themes/onepirate/modules/withRoot'
import AppFooter from './AppFooter'
import ProductHero from './ProductHero'
import ProductValues from './ProductValues'

function Home() {
  return (
    <>
      <ProductHero />
      <ProductValues />
      <AppFooter />
    </>
  )
}

export default withRoot(Home)

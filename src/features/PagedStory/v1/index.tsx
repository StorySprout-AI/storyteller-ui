import React from 'react'
import { ResponsiveAppBar } from './modules/views/AppBar'
import withRoot from './modules/withRoot'
// import { Routes } from 'react-router-dom'

// Theme: https://mui.com/store/items/onepirate/
function PagedStoryV1() {
  return (
    <>
      <ResponsiveAppBar />
      <p>Building V1</p>
    </>
  )
}

export default withRoot(PagedStoryV1)

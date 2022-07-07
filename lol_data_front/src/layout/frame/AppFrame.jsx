import React from 'react'

import Header from './Header'
import Footer from './Footer'

interface LayoutPropTypes {
  children: React.ReactNode;
}

export default function AppFrame(props: LayoutPropTypes) {
  const { children } = props
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

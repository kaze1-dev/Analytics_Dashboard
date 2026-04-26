import React from 'react'
import Navbar from '../../components/navbar'
import { ReactNode } from 'react'
import Providers from '../providers'

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <Providers>
      <Navbar />
      {children}
    </Providers>
  )
}

export default MainLayout
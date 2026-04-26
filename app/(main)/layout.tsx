import React from 'react'
import Navbar from '../../components/navbar'
import { ReactNode } from 'react'

const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default MainLayout
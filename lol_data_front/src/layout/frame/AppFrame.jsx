import React from 'react'
import { Outlet } from 'react-router-dom'

import NavMenu from '../../app/components/NavMenu'

export default function AppFrame() {
  return (
    <>
      <div className="bg-[#1c2128] min-h-screen flex">
        <div className="fixed h-screen">
          <NavMenu />
        </div>
        <div className="flex-1 ml-40 overflow-x-auto bg-base-300">
          <Outlet />
        </div>
      </div>
    </>
  )
}

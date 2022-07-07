import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import NavMenu from './components/NavMenu'

export default function BasePage() {
  const location = useLocation()
  const navigate = useNavigate()
  // 设置默认跳转
  useEffect(() => {
    if (location.pathname === '/home') {
      navigate('players')
    }
  }, [location, navigate])

  return (
    <div>
      <div className="bg-[#1c2128] min-h-screen flex">
        <div className="fixed h-screen">
          <NavMenu />
        </div>
        <div className="flex-1 ml-40 overflow-x-auto bg-base-300">
          {/* <Outlet /> */}
          {/* <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} /> */}
        </div>
      </div>
    </div>
  )
}

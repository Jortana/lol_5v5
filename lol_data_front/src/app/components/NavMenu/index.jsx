import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from './logo_lol.png'
import { ReactComponent as UserIcon } from './user.svg'

import toast, { Toaster } from 'react-hot-toast'

import { checkLogin } from '../../../utils'
import { logout } from '../../../api'

export default function NavMenu() {
  const [isLogin, setIsLogin] = useState(false)
  const [menu, setMenu] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (checkLogin()) {
      setIsLogin(true)
    }
  }, [])

  useEffect(() => {
    const baseMenu = [
      {
        label: '重要数据',
        to: 'players'
      },
      {
        label: '比赛数据',
        to: 'games'
      },
      {
        label: '数据排行',
        to: 'rate'
      }
    ]
    const adminMenu = [
      {
        label: '更新数据',
        to: 'update'
      }
    ]
    if (isLogin) {
      setMenu([...baseMenu, ...adminMenu])
    } else {
      setMenu([...baseMenu])
    }
  }, [isLogin])

  const loginClickHandler = () => {
    if (!isLogin) {
      navigate('/login')
    }
  }

  const logoutHandler = () => {
    logout()
    setIsLogin(false)
    toast.dismiss()
    toast.success('登出成功')
  }

  return (
    <div className="bg-slate-900 w-40 py-10 flex flex-col justify-between h-full">
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          style: {
            background: '#363636',
            color: '#fff'
          }
        }}
      />
      <div>
        <img className="w-20 h-20 mx-auto" src={logo} alt="logo" />
        <div className="text-[#c08f31] text-xl font-bold text-center m-3">
          <h1>⚣ 赛区 5v5</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-subtext divide-y divide-subtext/60">
        {menu.map((menuItem, index) => {
          return (
            <NavLink
              to={menuItem.to}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? 'text-bright-text py-5 px-2'
                  : 'py-5 px-2 hover:text-bright-text'
              }
            >
              {menuItem.label}
            </NavLink>
          )
        })}
      </div>
      <div className="flex justify-center items-center text-subtext">
        <div className="dropdown dropdown-hover dropdown-top">
          {/* <label class="btn m-1">Hover</label> */}
          <UserIcon
            tabIndex="0"
            className="h-6 w-6 mx-auto cursor-pointer hover:stroke-bright-text"
            onClick={loginClickHandler}
          />
          {isLogin === true ? (
            <div className="bg-transparent dropdown-content menu pb-2">
              <ul
                tabIndex="0"
                className="p-2 shadow bg-neutral rounded-box w-20 text-center -translate-x-7"
              >
                <li className="btn" onClick={logoutHandler}>
                  登出
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

import { Navigate, useNavigate } from 'react-router-dom'

import AppFrame from '../../layout/frame/AppFrame'
import Login from '../pages/Login'
import Players from '../pages/Players'
import Games from '../pages/Games'
import Rate from '../pages/Rate'
import Update from '../pages/Update'

import { checkLogin } from '../../utils'

// 用于显示页面标题和鉴权
const TitleAuth = ({ children, title, needLogin, roles }) => {
  const navigate = useNavigate()
  document.title = `${title} - ⚣ 数据`
  // 如果页面需要登录，则判断登录情况
  if (needLogin === true) {
    const { userInfo, isLogin } = checkLogin()
    // 验证登录和角色权限
    if (isLogin === false) {
      // 如果没有登录，跳转到登录页面
      return <Navigate to="/login" />
    } else if (roles !== undefined && roles.length !== 0) {
      // 如果当前页面有指定权限，则需要验证角色
      let check = false
      for (let role of userInfo.roles) {
        if (roles.includes(role)) {
          check = true
        }
      }
      if (!check) {
        navigate(-1, { replace: true })
      }
    }
  }
  return <div>{children}</div>
}

const element = [
  {
    path: '/',
    element: <AppFrame />,
    children: [
      {
        path: '/players',
        element: (
          <TitleAuth title="重要数据">
            <Players />
          </TitleAuth>
        )
      },
      {
        path: '/games',
        element: (
          <TitleAuth title="比赛数据">
            <Games />
          </TitleAuth>
        )
      },
      {
        path: '/rate',
        element: (
          <TitleAuth title="数据排行">
            <Rate />
          </TitleAuth>
        )
      },
      {
        path: '/update',
        element: (
          <TitleAuth title="更新数据" needLogin={true} roles={[99]}>
            <Update />
          </TitleAuth>
        )
      },
      {
        path: '/',
        element: <Navigate to="/players" />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <TitleAuth title="登录">
        <Login />
      </TitleAuth>
    )
  }
]

export default element

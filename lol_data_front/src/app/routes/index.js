import BasePage from '../BasePage'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    element: <BasePage />,
    children: [
      {
        path: 'players',
        component: () => import('../pages/Players'),
        meta: {
          title: '选手数据',
          needLogin: false
        }
      },
      {
        path: 'games',
        component: () => import('../pages/Games'),
        meta: {
          title: '游戏数据',
          needLogin: false
        }
      },
      {
        path: 'rate',
        component: () => import('../pages/Rate'),
        meta: {
          title: '数据排行',
          needLogin: false
        }
      },
      {
        path: 'update',
        component: () => import('../pages/Update'),
        meta: {
          title: '更新数据',
          needLogin: true
        }
      }
    ]
  },
  {
    path: 'login',
    component: () => import('../pages/Login'),
    meta: {
      title: '登录',
      needLogin: false
    }
  }
]

export default routes

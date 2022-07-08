/**
 * 根据 localStorage 中的用户信息判断是否已经登录以及是否过期
 */
export const checkLogin = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (!userInfo || new Date() > new Date(userInfo.expireTime)) {
    localStorage.clear()
    return { isLogin: false }
  }
  return { userInfo, isLogin: true }
}

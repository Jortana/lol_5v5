import axios from './authAxiosConfig'

/**
 * 登录
 * @returns
 */
export const login = (user) => {
  return axios.post('/api/user/login', user)
}

/**
 * 登出
 */
export const logout = () => {
  localStorage.clear()
}

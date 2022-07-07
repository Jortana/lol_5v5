import axios from './axiosConfig'

/**
 * 获取全部选手信息
 * @returns
 */
export const getPlayers = () => {
  return axios.get('/api/player/players')
}

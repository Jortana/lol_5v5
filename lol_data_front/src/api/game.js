import axios from './axiosConfig'

/**
 * 获取库中最后一次游戏时间
 * @returns
 */
export const getLastTime = () => {
  return axios.get('/api/game/lastTime')
}

/**
 * 更新库中的游戏数据
 * @param {String} cookie - cookie
 * @returns
 */
export const updateGames = (data) => {
  return axios.post('/api/game/games', { ...data })
}

/**
 * 获取分析情况
 * @returns
 */
export const getStatus = () => {
  return axios.get('/api/game/status')
}

/**
 * 分析数据
 * @returns
 */
export const analyzeGames = () => {
  return axios.patch('/api/game/games')
}

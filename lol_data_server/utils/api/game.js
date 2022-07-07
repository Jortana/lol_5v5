const axios = require('axios')
const {
  gameBaseUrl: { gameListUrl, gameInfoUrl }
} = require('../../config/config.default')

/**
 * 获取所有比赛列表
 * @returns
 */
exports.getAllGames = (headers) =>
  axios({
    method: 'get',
    url: gameListUrl,
    headers
  })

/**
 * 根据比赛 id 获取比赛详细信息
 * @param {Number} gameId - 比赛 id
 * @returns
 */
exports.getGameInfo = (gameId, headers) =>
  axios({
    method: 'get',
    url: `${gameInfoUrl}&gameId=${gameId}&r1=combatGains`,
    headers
  })

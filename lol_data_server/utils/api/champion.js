const http = require('../http')
const {
  championInfoBaseUrl,
  championListBaseUrl
} = require('../../config/config.default')

/**
 * 根据英雄 id 获取英雄信息
 * @param {Number} championId - 英雄 id
 * @returns
 */
exports.getChampionInfo = (championId) =>
  http.get(`${championInfoBaseUrl}/${championId}.js`)

/**
 * 获取所有英雄信息
 * @returns
 */
exports.getChampionList = () => http.get(championListBaseUrl)

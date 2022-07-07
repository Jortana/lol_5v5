const { Game } = require('../models')
const { successRes } = require('../utils/resBuilder')

const saveGameInfo = require('../utils/saveGameInfo')
const analyze = require('../utils/analyze')

/**
 * 获取库中最后一次游戏时间
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getLastTime = async (req, res, next) => {
  try {
    const lastGame = (
      await Game.find({})
        .sort([['gameInfo.gameStartTimestamp', -1]])
        .limit(1)
    )[0]
    res
      .status(200)
      .json(successRes({ lastTime: lastGame.gameInfo.gameStartTimestamp }))
  } catch (err) {
    next(err)
  }
}

/**
 * 更新数据
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.updateGames = async (req, res, next) => {
  try {
    const { cookie } = req.body
    const lastGame = (
      await Game.find({})
        .sort([['gameInfo.gameStartTimestamp', -1]])
        .limit(1)
    )[0]
    const startTimestamp = lastGame
      ? lastGame.gameInfo.gameStartTimestamp
      : 1654012800000
    await saveGameInfo(startTimestamp, { cookie })
    res.status(200).json(successRes({ message: '更新成功' }))
  } catch (err) {
    next(err)
  }
}

/**
 * 获取游戏统计情况
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getStatus = async (req, res, next) => {
  try {
    const total = await Game.countDocuments()
    const analyzed = await Game.countDocuments({ analyzed: true })
    res.status(200).json(
      successRes({
        total,
        analyzed,
        others: total - analyzed
      })
    )
  } catch (err) {
    next(err)
  }
}

/**
 * 对未分析的数据进行分析
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.analyzeGames = async (req, res, next) => {
  try {
    await analyze()
    res.status(200).json(successRes({ message: '分析成功' }))
  } catch (err) {
    next(err)
  }
}

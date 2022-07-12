const { Game, Match } = require('../models')
const { successRes } = require('../utils/resBuilder')

const saveGameInfo = require('../utils/saveGameInfo')
const analyze = require('../utils/analyze')
const matchAnalyze = require('../utils/matchAnalyze')

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
    const matchAnalyzed = await Game.countDocuments({ matchAnalyzed: true })
    res.status(200).json(
      successRes({
        total,
        analyzed,
        matchAnalyzed
      })
    )
  } catch (err) {
    next(err)
  }
}

/**
 * 对未进行选手数据分析的数据进行分析
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.analyzeGames = async (req, res, next) => {
  try {
    await analyze()
    res.status(200).json(successRes({ message: '选手数据分析完成' }))
  } catch (err) {
    next(err)
  }
}

/**
 * 对未进行匹配数据分析的数据进行分析
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.matchAnalyzeGames = async (req, res, next) => {
  try {
    await matchAnalyze()
    res.status(200).json(successRes({ message: '匹配数据分析完成' }))
  } catch (err) {
    next(err)
  }
}

/**
 * 获取选手匹配统计情况
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getMatchStatus = async (req, res, next) => {
  try {
    const {
      offset = 0,
      limit = 6,
      sort = 'winRate',
      reverse = false,
      size
    } = req.query
    // 根据 sort 构造 $sort 的参数
    const sortObj = {}
    sortObj[sort] = reverse === 'true' ? 1 : -1

    // 构造 aggregate 参数
    const query = [
      {
        $match: {
          total: {
            $gte: 10
          }
        }
      },
      {
        $lookup: {
          from: 'players',
          localField: 'players',
          foreignField: '_id',
          as: 'playersInfo'
        }
      },
      {
        $project: {
          'playersInfo.summonerName': 1,
          'playersInfo.profileIconId': 1,
          total: 1,
          win: 1,
          winRate: { $divide: ['$win', '$total'] }
        }
      },
      {
        $sort: sortObj
      },
      {
        $count: 'total'
      }
    ]
    if (size !== undefined && size !== 'undefined' && size !== '0') {
      query.unshift({
        $match: {
          size: Number.parseInt(size, 10)
        }
      })
    }
    const { total } = (await Match.aggregate(query))[0]
    // 补全 query
    query.pop()
    query.push(
      {
        $skip: Number.parseInt(offset, 10)
      },
      {
        $limit: Number.parseInt(limit, 10)
      }
    )

    // console.log(query)

    const matches = await Match.aggregate(query)
    res.status(200).json(successRes({ matches, total }))
  } catch (err) {
    next(err)
  }
}

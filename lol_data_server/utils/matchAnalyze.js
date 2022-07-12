const { Game, Match } = require('../models')

const arrayEqual = require('./arrayEqual')

const matchAnalyze = async () => {
  // 获取所有没有进行选手匹配分析过的对局信息
  const games = await Game.find({ matchAnalyzed: false })

  // 存储对局选手和胜负信息
  const data = []
  // 对每一场对局进行分析
  games.forEach((game) => {
    const win = []
    const fail = []
    const players = game.participants
    players.forEach((player) => {
      if (player.stats.win === 'Win') {
        win.push(player.playerId)
      } else {
        fail.push(player.playerId)
      }
    })
    data.push(
      { players: [...win], win: true },
      { players: [...fail], win: false }
    )
  })

  // 存储结果
  const matches = []
  // 对每个队伍的选手进行组合，选出全部组合的可能性
  const findMatches = (prefix, players, win) => {
    if (prefix.length >= 2) {
      // 查看结果中有没有重复的组合，算法已经优化，单个数组中是不会出现重复元素的
      let index = -1
      for (let i = 0; i < matches.length; i += 1) {
        // 长度相等再进行判断
        if (
          matches[i].players.length === prefix.length &&
          arrayEqual(matches[i].players, prefix)
        ) {
          index = i
          break
        }
      }

      if (index === -1) {
        // 如果之前没有这个组合，则新增一个
        matches.push({
          players: prefix,
          total: 1,
          win: win === true ? 1 : 0,
          size: prefix.length
        })
      } else {
        // 如果之前有这个组合，则更新
        const cur = matches[index]
        matches[index] = {
          players: cur.players,
          total: cur.total + 1,
          win: win === true ? cur.win + 1 : cur.win
        }
      }
    }

    players.forEach((player, index) => {
      const temp = [...players]
      const choose = temp.splice(0, index + 1)
      findMatches([...prefix, choose[choose.length - 1]], [...temp], win)
    })
  }

  data.forEach(({ players, win }) => {
    findMatches([], players, win)
  })

  // 将分析结果存入数据库
  let operations = []
  matches.forEach((match) => {
    operations.push(
      Match.findOneAndUpdate(
        { players: match.players },
        {
          $inc: { total: match.total, win: match.win }
        },
        { upsert: true }
      )
    )
  })
  await Promise.all(operations)

  // 更新 games 的分析情况
  operations = []
  games.forEach((game) => {
    operations.push(
      Game.findByIdAndUpdate(game._id, {
        $set: { matchAnalyzed: true }
      })
    )
  })
  await Promise.all(operations)
}

module.exports = matchAnalyze

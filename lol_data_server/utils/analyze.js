/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
const { Game, Champion, Player } = require('../models')

const analyze = async () => {
  // 获取所有没有分析过的对局信息
  const games = await Game.find({ analyzed: false })

  for (let gameIndex = 0; gameIndex < games.length; gameIndex += 1) {
    const game = games[gameIndex]

    // await Promise.all(
    //   games.map(async (game) => {
    // 记录 ban
    const { bannedChampions } = game.gameInfo
    for (let i = 0; i < bannedChampions.length; i += 1) {
      const champion = bannedChampions[i]
      const qChampion = await Champion.findOne({
        championId: champion.championId
      })
      await Champion.updateOne(
        {
          championId: champion.championId
        },
        {
          ban: qChampion.ban + 1
        }
      )
    }

    // 记录大小龙击杀
    const { teamStats } = game.gameStats
    let blueStats
    let redStats
    if (teamStats[0].teamId === 100) {
      blueStats = teamStats[0]
      redStats = teamStats[1]
    } else {
      blueStats = teamStats[1]
      redStats = teamStats[0]
    }
    const blueDragon = blueStats.dragonKills
    const redDragon = redStats.dragonKills
    const blueBaron = blueStats.baronKills
    const redBaron = redStats.baronKills
    const blueRiftHerald = blueStats.riftHeraldKills
    const redRiftHerald = redStats.riftHeraldKills
    // 计算队伍击杀远古野怪率
    const blueDragonRate = blueDragon / (blueDragon + redDragon)
    const redDragonRate = redDragon / (blueDragon + redDragon)
    const blueBaronRate = blueBaron / (blueBaron + redBaron)
    const redBaronRate = redBaron / (blueBaron + redBaron)
    const blueRiftHeraldRate = blueRiftHerald / 2
    const redRiftHeraldRate = redRiftHerald / 2

    // 对于选手的信息先集中处理信息再集中存储
    const players = game.participants
    const unsavePlayers = []

    // 双方伤害和承伤数据
    let blueDamage = 0
    let redDamage = 0
    let blueDamageTaken = 0
    let redDamageTaken = 0

    // 对每个选手进行数据处理
    for (let i = 0; i < players.length; i += 1) {
      const curPlayer = players[i]
      let player = await Player.findOne({ summonerId: curPlayer.summonerId })
      if (!player) {
        // 如果没找到该选手，就需要新建一个
        player = new Player({
          summonerId: curPlayer.summonerId,
          summonerName: curPlayer.summonerName
        })
      }
      player.profileIconId = curPlayer.profileIconId
      // player = player.toJSON()

      // 进行选手信息的关联
      // console.log(' player._id', player._id)
      games[gameIndex].participants[i].playerId = player._id
      // console.log(games[gameIndex].participants[i].playerId)

      player.gameTotal += 1
      const { teamId, stats, timeline } = curPlayer

      // 写入数据
      player.teamId = teamId
      player.teamPosition = stats.teamPosition
      player.win += stats.win === 'Win' ? 1 : 0
      player.visionScore =
        player.visionScore === 0
          ? stats.visionScore
          : (player.visionScore + stats.visionScore) / 2
      player.kills += stats.kills
      player.deaths += stats.deaths
      player.assists += stats.assists
      player.totalDamage += stats.totalDamageDealtToChampions
      player.thisTotalDamage = stats.totalDamageDealtToChampions
      player.totalDamageTaken += stats.totalDamageTaken
      player.thisTotalDamageTaken = stats.totalDamageTaken

      player.goldEarned += stats.goldEarned
      player.goldSpent += stats.goldSpent
      player.thisGoldEarned = stats.goldEarned
      player.conversion =
        player.conversion === 0
          ? player.totalDamage / player.goldSpent
          : (player.conversion + player.totalDamage / player.goldSpent) / 2
      player.kda = (player.kills + player.assists) / player.deaths
      player.creepsPerMinDeltas = timeline.creepsPerMinDeltas

      // 记录与队伍相关的数据，100 是蓝色方
      if (teamId === 100) {
        blueDamage += stats.totalDamageDealtToChampions
        blueDamageTaken += stats.totalDamageTaken
        if (blueDragon + redDragon !== 0) {
          player.dragonRate =
            player.dragonRate === 0
              ? blueDragonRate
              : (player.dragonRate + blueDragonRate) / 2
        }

        if (blueBaron + redBaron !== 0) {
          player.baronRate =
            player.baronRate === 0
              ? blueBaronRate
              : (player.baronRate + blueBaronRate) / 2
        } else {
          player.baronRate /= 2
        }

        player.riftHeraldRate =
          player.riftHeraldRate === 0
            ? blueRiftHeraldRate
            : (player.riftHeraldRate + blueRiftHeraldRate) / 2
      } else {
        redDamage += stats.totalDamageDealtToChampions
        redDamageTaken += stats.totalDamageTaken

        if (blueDragon + redDragon !== 0) {
          player.dragonRate =
            player.dragonRate === 0
              ? redDragonRate
              : (player.dragonRate + redDragonRate) / 2
        }

        if (blueBaron + redBaron !== 0) {
          player.baronRate =
            player.baronRate === 0
              ? redBaronRate
              : (player.baronRate + redBaronRate) / 2
        } else {
          player.baronRate /= 2
        }

        player.riftHeraldRate =
          player.riftHeraldRate === 0
            ? redRiftHeraldRate
            : (player.riftHeraldRate + redRiftHeraldRate) / 2
      }

      // 标记是否计算过对位数据
      player.posAnalyzed = false
      unsavePlayers.push(player)
    }

    // 对位数据和队伍数据计算
    for (let i = 0; i < unsavePlayers.length; i += 1) {
      const player = unsavePlayers[i]

      // 计算伤害和承伤占比
      const teamDamage = player.teamId === 100 ? blueDamage : redDamage
      const teamDamageTaken =
        player.teamId === 100 ? blueDamageTaken : redDamageTaken

      // 伤害占比
      if (player.totalDamagePercent === 0) {
        player.totalDamagePercent = player.thisTotalDamage / teamDamage
      } else {
        player.totalDamagePercent =
          (player.totalDamagePercent + player.thisTotalDamage / teamDamage) / 2
      }

      // 承伤占比
      if (player.totalDamageTakenPercent === 0) {
        player.totalDamageTakenPercent =
          player.thisTotalDamageTaken / teamDamageTaken
      } else {
        player.totalDamageTakenPercent =
          (player.totalDamageTakenPercent +
            player.thisTotalDamageTaken / teamDamageTaken) /
          2
      }

      // 如果没有分析过则进行对位分析
      if (!player.posAnalyzed) {
        const posPlayer = unsavePlayers.find(
          (otherPlayer) =>
            player.teamPosition === otherPlayer.teamPosition &&
            player.teamId !== otherPlayer.teamId
        )

        // 计算对位经济差
        if (player.goldEarnedDiff === 0) {
          player.goldEarnedDiff =
            player.thisGoldEarned - posPlayer.thisGoldEarned
        } else {
          player.goldEarnedDiff =
            (player.goldEarnedDiff +
              player.thisGoldEarned -
              posPlayer.thisGoldEarned) /
            2
        }

        if (posPlayer.goldEarnedDiff === 0) {
          posPlayer.goldEarnedDiff =
            posPlayer.thisGoldEarned - player.thisGoldEarned
        } else {
          posPlayer.goldEarnedDiff =
            (posPlayer.goldEarnedDiff +
              posPlayer.thisGoldEarned -
              player.thisGoldEarned) /
            2
        }

        // 计算对位补刀差
        if (player.teamPosition !== 'UTILITY') {
          // eslint-disable-next-line no-restricted-syntax, guard-for-in
          for (const delta in player.creepsPerMinDeltas) {
            if (player.csDiffPerMinDeltas[delta] === 0) {
              player.csDiffPerMinDeltas[delta] =
                player.creepsPerMinDeltas[delta] -
                posPlayer.creepsPerMinDeltas[delta]
            } else {
              player.csDiffPerMinDeltas[delta] =
                (player.csDiffPerMinDeltas[delta] +
                  player.creepsPerMinDeltas[delta] -
                  posPlayer.creepsPerMinDeltas[delta]) /
                2
            }

            if (posPlayer.csDiffPerMinDeltas[delta] === 0) {
              posPlayer.csDiffPerMinDeltas[delta] =
                posPlayer.creepsPerMinDeltas[delta] -
                player.creepsPerMinDeltas[delta]
            } else {
              posPlayer.csDiffPerMinDeltas[delta] =
                (posPlayer.csDiffPerMinDeltas[delta] +
                  posPlayer.creepsPerMinDeltas[delta] -
                  player.creepsPerMinDeltas[delta]) /
                2
            }
          }
        }

        player.posAnalyzed = true
        posPlayer.posAnalyzed = true
      }
    }

    // console.log(unsavePlayers[0])
    for (let i = 0; i < unsavePlayers.length; i += 1) {
      // await Player.findOneAndUpdate(
      //   { summonerId: unsavePlayers[i].summonerId },
      //   unsavePlayers[i]
      // )
      // const unsavePlayer = new Player(unsavePlayers[i])
      const unsavePlayer = unsavePlayers[i]
      await unsavePlayer.save()
    }
    //   })
    // )
  }

  // console.log(games[0].participants[0])
  // 保存分析过的数据
  const unsaveGames = []
  games.forEach((game) => {
    const unsaveGame = game
    unsaveGame.analyzed = true
    unsaveGame.participants = [...unsaveGame.participants]
    // unsaveGames.push(unsaveGame.save())
    unsaveGames.push(
      Game.findByIdAndUpdate(unsaveGame._id, {
        $set: { analyzed: true, participants: unsaveGame.participants }
      })
    )
  })
  await Promise.all(unsaveGames)
}

module.exports = analyze

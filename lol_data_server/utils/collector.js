const { getAllGames, getGameInfo } = require('./api/game')

const collector = async (startTimestamp, headers = {}) => {
  const selectedGames = []
  const startTime = new Date(startTimestamp)
  await getAllGames(headers).then((response) => {
    let { data } = response
    data = JSON.parse(data.slice(16))

    // 获取不到数据（大概率是 cookie 失效了）
    if (data.status !== 0) {
      throw data.msg
    }

    const {
      msg: { games }
    } = data
    // 选取时间合适的比赛
    for (let i = 0; i < games.length; i += 1) {
      const game = games[i]

      const gameTime = new Date(game.timestamp)
      if (gameTime < startTime) {
        break
      }

      if (game.queue === 0) {
        selectedGames.push(game)
      }
    }
  })

  // 查询每场比赛的具体数据
  const gameInfos = []
  for (let i = 0; i < selectedGames.length; i += 1) {
    const selectedGame = selectedGames[i]
    // eslint-disable-next-line no-await-in-loop
    await getGameInfo(selectedGame.gameId, headers).then((response) => {
      const { data } = response
      const { msg } = JSON.parse(data.slice(18))

      // 统计召唤师峡谷的比赛，排除人少和退游戏重开的情况
      if (
        msg.gameStats.completed === true &&
        msg.gameInfo.gameMode === 'CLASSIC' &&
        msg.participants.length === 10
      ) {
        gameInfos.push(msg)
      }
    })
  }

  return gameInfos
}

module.exports = collector

const { Game, Champion } = require('../models')
const collector = require('./collector')

const saveGameInfo = async (time, headers) => {
  await collector(time, headers)
    .then((selectedGames) => {
      selectedGames.map(async (selectedGame) => {
        // 将英雄名称存进数据
        await Promise.all(
          selectedGame.gameInfo.bannedChampions.map(async (bannedChampion) => {
            const champion = await Champion.findOne({
              championId: bannedChampion.championId
            })
            // eslint-disable-next-line no-param-reassign
            bannedChampion.championName = champion.name
          })
        )
        const game = new Game(selectedGame)
        await game.save()
      })
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
}

module.exports = saveGameInfo

// saveGameInfo(1654012800000)

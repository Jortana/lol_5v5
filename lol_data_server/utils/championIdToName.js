const { getChampionInfo } = require('./api/champion')

const championIdToName = (championId) => {
  return getChampionInfo(championId).then((response) => {
    const { data } = response
    return data.hero.name
  })
}

module.exports = championIdToName

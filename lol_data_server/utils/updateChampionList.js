const { getChampionList } = require('./api/champion')
const { Version, Champion } = require('../models')

const updateChampionList = async () => {
  const curVersionInfo = await Version.findOne()
  const { version: curVersion } = curVersionInfo

  getChampionList().then(async (response) => {
    const {
      data: { hero, version }
    } = response

    // 如果版本号不相同则检查文档数量
    return
    if (curVersion !== version) {
      curVersionInfo.version = version
      const count = await Champion.count()
      if (count !== hero.length) {
        await Champion.deleteMany()
        hero.forEach(async (heroInfo) => {
          const champion = new Champion(heroInfo)
          champion.championId = heroInfo.heroId
          await champion.save()
        })
        await curVersionInfo.save()
      }
    }

    console.log('已全部更新')
  })
}

module.exports = updateChampionList

// updateChampionList()

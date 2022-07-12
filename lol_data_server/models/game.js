const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  gameInfo: {
    gameId: {
      type: Number,
      required: true
    },
    gameCreationTime: {
      type: Number,
      required: true
    },
    bannedChampions: {
      type: [
        {
          championId: Number,
          championName: String,
          teamId: Number,
          pickTurn: Number
        }
      ],
      required: true
    },
    gameStartTimestamp: {
      type: Number,
      required: true
    }
  },
  gameStats: {
    teamStats: {
      type: [
        {
          teamId: Number,
          win: String,
          firstBlood: Boolean,
          firstTower: Boolean,
          firstInhibitor: Boolean,
          firstBaron: Boolean,
          firstDragon: Boolean,
          firstRiftHerald: Boolean,
          towerKills: Number,
          inhibitorKills: Number,
          baronKills: Number,
          dragonKills: Number,
          vilemawKills: Number,
          riftHeraldKills: Number
        }
      ],
      required: true
    }
  },
  participants: {
    // type: [
    //   {
    //     originalAccountId: Number,
    //     currentAccountId: Number,
    //     teamId: Number,
    //     championId: Number,
    //     championName: String,
    //     summonerName: String,
    //     stats: {
    //       win: String,
    //     }
    //   }
    // ],
    type: Array,
    required: true
  },
  analyzed: {
    type: Boolean,
    default: false
  },
  matchAnalyzed: {
    type: Boolean,
    default: false
  }
})

module.exports = gameSchema

const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  // 召唤师 id
  summonerId: {
    type: Number,
    requied: true
  },
  // 召唤师名称
  summonerName: {
    type: String,
    requied: true
  },
  // 场数
  gameTotal: {
    type: Number,
    default: 0
  },
  // 胜利场数
  win: {
    type: Number,
    default: 0
  },
  // 视野分
  visionScore: {
    type: Number,
    default: 0
  },
  // 击杀数
  kills: {
    type: Number,
    default: 0
  },
  // 死亡数
  deaths: {
    type: Number,
    default: 0
  },
  // 助攻数
  assists: {
    type: Number,
    default: 0
  },
  // 伤害
  totalDamage: {
    type: Number,
    default: 0
  },
  // 承伤
  totalDamageTaken: {
    type: Number,
    default: 0
  },
  // 承伤占比
  totalDamageTakenPercent: {
    type: Number,
    default: 0
  },
  // 伤害占比
  totalDamagePercent: {
    type: Number,
    default: 0
  },
  // 获取金币
  goldEarned: {
    type: Number,
    default: 0
  },
  // 花费金币
  goldSpent: {
    type: Number,
    default: 0
  },
  // 伤转
  conversion: {
    type: Number,
    default: 0
  },
  // kda
  kda: {
    type: Number,
    default: 0
  },
  // 所在队伍控龙率
  dragonRate: {
    type: Number,
    default: 0
  },
  // 所在队伍大龙击杀率
  baronRate: {
    type: Number,
    default: 0
  },
  // 所在队伍每场比赛先锋击杀数量
  riftHeraldRate: {
    type: Number,
    default: 0
  },
  // 平均每场比赛对位经济差
  goldEarnedDiff: {
    type: Number,
    default: 0
  },
  // 平均每场比赛对位补刀差
  csDiffPerMinDeltas: {
    '0-10': {
      type: Number,
      default: 0
    },
    '10-20': {
      type: Number,
      default: 0
    },
    '20-30': {
      type: Number,
      default: 0
    },
    '30-end': {
      type: Number,
      default: 0
    }
  }
})

module.exports = playerSchema

const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')

// 连接 MongoDB 数据库
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

// 当连接失败的时候
db.on('error', (err) => {
  console.log('MongoDB 数据库连接失败', err)
})

// 当连接成功的时候
db.once('open', () => {
  console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
  Game: mongoose.model('Game', require('./game')),
  Champion: mongoose.model('Champion', require('./champion')),
  Version: mongoose.model('Version', require('./version')),
  Player: mongoose.model('Player', require('./player')),
  User: mongoose.model('User', require('./user')),
  Match: mongoose.model('Match', require('./match'))
}

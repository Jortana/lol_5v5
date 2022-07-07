const express = require('express')

const router = express.Router()

// 用户相关 api
router.use('/user', require('./user'))

// 选手相关 api
router.use('/player', require('./player'))

// 游戏数据相关 api
router.use('/game', require('./game'))

module.exports = router

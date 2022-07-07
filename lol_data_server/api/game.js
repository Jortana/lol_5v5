const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth')
const gameController = require('../controller/game')

// 获取库中最后一次游戏时间
router.get('/lastTime', gameController.getLastTime)

// 更新游戏数据
router.post('/games', auth, gameController.updateGames)

// 获取游戏统计情况
router.get('/status', gameController.getStatus)

// 分析游戏数据
router.patch('/games', auth, gameController.analyzeGames)

module.exports = router

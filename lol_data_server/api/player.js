const express = require('express')

const playerController = require('../controller/player')

const router = express.Router()

// 登录
router.get('/players', playerController.getPlayers)

module.exports = router

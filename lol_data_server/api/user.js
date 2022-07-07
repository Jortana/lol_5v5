const express = require('express')

const userController = require('../controller/user')
const userValidator = require('../validator/user')

const router = express.Router()

// 登录
router.post('/login', userValidator.login, userController.login)

module.exports = router

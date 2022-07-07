const { body } = require('express-validator')

const validate = require('../middleware/validate')
const { User } = require('../models')
const sha1 = require('../utils/sha1')

exports.login = [
  validate([
    body('user.username').notEmpty().withMessage('用户名不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.username').custom(async (username, { req }) => {
      const user = await User.findOne({ username }).select([
        'username',
        'password'
      ])
      if (!user) {
        return Promise.reject('用户不存在')
      }

      // 将数据挂载到请求对象中
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (sha1(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ])
]

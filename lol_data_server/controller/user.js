const jwt = require('../utils/jwt')
const { jwtSecret } = require('../config/config.default')

exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON()
    const token = await jwt.sign(
      {
        userId: user._id
      },
      jwtSecret
    )

    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch (err) {
    next(err)
  }
}

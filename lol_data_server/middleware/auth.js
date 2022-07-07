const { jwtSecret } = require('../config/config.default')
const { verify } = require('../utils/jwt')

const { failRes } = require('../utils/resBuilder')

/**
 * 验证 token 是否有效
 * 无效响应 401 状态码
 * 有效把用户信息读取出来挂载到 req 请求对象上继续往后执行
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = async (req, res, next) => {
  // 从请求头获取 token 数据
  let token = req.headers.authorization
  token = token ? token.split('Bearer ')[1] : null
  if (!token) {
    return res.status(200).json(failRes(400))
  }

  try {
    // const decodedToken = await verify(token, jwtSecret)
    await verify(token, jwtSecret)
  } catch (err) {
    return res.status(200).json(failRes(401))
  }

  next()
}

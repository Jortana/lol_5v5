const crypto = require('crypto')

const { passwordUUID } = require('../config/config.default')

/**
 * 根据传入的字符串用 uuid 加盐生成加密字符串
 * @param {String} str - 待加密的字符串
 * @return {String} - 加密后的字符串
 */
module.exports = (str) => {
  return crypto
    .createHash('sha1')
    .update(str + passwordUUID)
    .digest('hex')
}

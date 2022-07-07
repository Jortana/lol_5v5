/** ***   request.js   *** */
// 导入axios
const axios = require('axios')

const { cookie } = require('../config/config.default')

axios.defaults.withCredentials = true
// 创建新的axios实例，
const service = axios.create({
  timeout: 5000, // 请求的超时时间
  headers: {
    cookie
  },
  withCredentials: true // 允许携带cookie
})

module.exports = service

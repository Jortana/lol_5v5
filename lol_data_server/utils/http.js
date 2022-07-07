// 导入封装好的axios实例
const request = require('./request')

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url, params) {
    const config = {
      method: 'get',
      url
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params) {
    const config = {
      method: 'post',
      url
    }
    if (params) config.data = params
    return request(config)
  },
  put(url, params) {
    const config = {
      method: 'put',
      url
    }
    if (params) config.data = params
    // if (params) config.params = params
    return request(config)
  },
  delete(url, params) {
    const config = {
      method: 'delete',
      url
    }
    if (params) config.data = params
    return request(config)
  }
}
// 导出
module.exports = http

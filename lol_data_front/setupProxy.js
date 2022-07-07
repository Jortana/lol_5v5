const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:9002',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )

  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://localhost:9000',
      changeOrigin: true,
      pathRewrite: {
        '^/auth': '/api'
      }
    })
  )
}

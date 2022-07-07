const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./api')
const errorHandler = require('./middleware/error-handler')
require('./models')

const app = express()

// 日志输出
app.use(morgan('dev'))

// 解析 json 格式请求体
app.use(express.json())

// 为客户端提供跨域资源请求
app.use(cors())

const PORT = process.env.PORT || 9002

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

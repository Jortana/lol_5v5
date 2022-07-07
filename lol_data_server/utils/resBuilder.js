exports.successRes = (data) => ({
  code: 200,
  data
})

exports.failRes = (code, data = {}) => ({ code, data })

const mongoose = require('mongoose')
const sha1 = require('../utils/sha1')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (value) => sha1(value),
    select: false
  }
})

module.exports = userSchema

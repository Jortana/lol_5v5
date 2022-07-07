const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true
  }
})

module.exports = versionSchema

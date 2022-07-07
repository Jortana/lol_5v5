const mongoose = require('mongoose')

const championSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  banAudio: {
    type: String,
    required: true
  },
  championId: {
    type: Number,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true
  },
  selectAudio: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  ban: {
    type: Number,
    default: 0
  },
  pick: {
    type: Number,
    default: 0
  }
})

module.exports = championSchema

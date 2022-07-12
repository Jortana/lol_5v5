const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new mongoose.Schema({
  players: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
    required: true
  },
  total: {
    type: Number,
    default: 0
  },
  win: {
    type: Number,
    default: 0
  },
  size: {
    type: Number
  }
})

module.exports = userSchema

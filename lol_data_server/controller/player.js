const { Player } = require('../models')

exports.getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find({
      gameTotal: { $gte: 3 }
    })
    res.status(200).json({
      players
    })
  } catch (err) {
    next(err)
  }
}

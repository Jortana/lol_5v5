const { validationResult } = require('express-validator')

const { failRes } = require('../utils/resBuilder')

module.exports = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)))

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  res.status(200).json(failRes(400, { errors: errors.array() }))
  // res.status(400).json({ errors: errors.array() })
}

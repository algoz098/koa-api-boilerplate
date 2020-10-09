const { joi } = require('../route')

const request = {
  email: joi.string().lowercase().email().required(),
  password: joi.string().max(100).required()
}

module.exports = request

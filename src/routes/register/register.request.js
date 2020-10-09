const { joi } = require('../route')

const request = {
  name: joi.string().min(5).max(30).required(),
  email: joi.string().lowercase().email().required(),
  password: joi.string().max(100).required()
}

module.exports = request

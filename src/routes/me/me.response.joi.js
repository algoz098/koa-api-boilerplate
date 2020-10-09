const { joi } = require('../route')

const request = {
  userId: joi.string(),
  name: joi.string()
}

module.exports = request

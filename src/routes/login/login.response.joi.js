const { joi } = require('../route')

const request = {
  token: joi.string(),
  type: 'Bearer',
  expiration: joi.number(),
}

module.exports = request

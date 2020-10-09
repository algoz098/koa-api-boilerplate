const { joi } = require('./route')

const request = {
  code: joi.number().integer().required(),
  message: joi.string().required(),
  errors: joi.object(),
}

module.exports = request

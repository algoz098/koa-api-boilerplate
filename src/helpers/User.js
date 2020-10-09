const app = require('../app')
const { decode } = require('../jwt')
const { Users } = require('../db/models/index')

app.context.user = function() {
  const { authorization } = this.request.headers
  const token = authorization.replace('Bearer ', '')

  let _id = decode(token)
  _id = _id.data
  return Users.findOne({ _id })
}

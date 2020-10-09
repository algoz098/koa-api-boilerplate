const { Users } = require('../../db/models')
const { sign } = require('../../jwt')
const { compare } = require('../../bcrypt')

async function handler(ctx) {
  if (ctx.invalid) return ctx.validateRequest()

  const { body } = ctx.request
  const user = await Users.findOne({ email: body.email })

  if (!user) {
    return ctx.body = ctx.createResponseError(401, 'notFound', undefined)
  }

  const check = await compare(body.password, user.password)
  if (!check) {
    return ctx.body = ctx.createResponseError(401, 'notFound', undefined)
  }

  const exp = new Date().getTime() + 2592000
  const result = sign(user.toReturn()._id)
  ctx.body = {
    token: result,
    type: 'Bearer',
    expiration: exp
  }
}
module.exports = handler

const { Users } = require('../../db/models')

async function handler(ctx) {
  if (ctx.invalid) return ctx.validateRequest()

  const { body } = ctx.request
  const userC = await Users.findOne({ email: body.email })

  if (userC) {
    return ctx.createResponseError(401, 'email registered', undefined)
  }

  const user = new Users()
  user.name = body.name
  user.email = body.email
  user.password = body.password
  await user.save()

  ctx.status = 201
  ctx.body = user.toReturn()
}
module.exports = handler

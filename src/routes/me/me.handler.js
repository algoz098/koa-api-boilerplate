async function handler(ctx) {
  const user = await ctx.user()
  if (!user) return ctx.createResponseError(404)
  ctx.body = user.toReturn()
}

module.exports = handler

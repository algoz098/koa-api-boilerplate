const koaJwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')

const jwtKoa = koaJwt({
  secret: process.env.SECRET,
}).unless({
  path: [/^\/public/, '/', '/register', '/login', '/docs', '/api.json']
})

const sign = function(data) {
  return jsonwebtoken.sign({
    data,
    exp: new Date().getTime() + 2592000 // 30 days
  }, process.env.SECRET)
}

const queryToHeader = async function(ctx, next) {
  const token = ctx.request.query.token

  if (token) {
    ctx.request.headers.authorization = `Bearer ${token}`
  }

  await next()
}

function decode(token) {
  return jsonwebtoken.verify(token, process.env.SECRET)
}

module.exports = {
  decode,
  queryToHeader,
  middleware: jwtKoa,
  sign
}

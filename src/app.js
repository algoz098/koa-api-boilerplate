require('dotenv').config()
process.DEV = process.env.ENV === 'production' || true
require('./console.log')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { middleware, queryToHeader } = require('./jwt')
const onError = require('./onError')
const app = new Koa()

const router = require('./routes')

app.use(async(ctx, next) => {
  const id = Math.floor(Math.random() * 1000000000)

  console.time(`${ctx.url}_${id}`)
  await next()
  console.timeEnd(`${ctx.url}_${id}`)
})

app.use(async(ctx, next) => {
  await next()
  switch (ctx.status) {
  case 404:
    ctx.body = { error: 'not found' }
    break
  }
})

app.use(queryToHeader)
app.use(middleware)
app.use(bodyParser())
app.use(router.middleware())
app.on('error', onError)

module.exports = app

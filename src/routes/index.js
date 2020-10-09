const { route } = require('./route')

require('./importRoutes')

route.use(async(ctx, next) => {
  ctx.set('Accept', 'application/json')
  ctx.set('Content-Type', 'application/json')

  const number = Math.floor(Math.random() * 1000000000)

  console.time(`${ctx.request.url}_${number}`)
  next()
  console.timeEnd(`${ctx.request.url}_${number}`)
})

const router = route
module.exports = router

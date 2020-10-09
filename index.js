require('./src/console.log')
const app = require('./src/index')
const colors = require('colors/safe')
const connect = require('./src/db')
const PORT = process.env.PORT || 3000

async function start() {
  await connect()
  console.log(colors[process.DEV ? 'red' : 'green'].inverse(`Env: ${process.DEV ? 'DEV' : 'PROD'}`))
  app.listen(PORT)
  console.log(colors.green.inverse(`Running on port: ${PORT}`))
}

start()

const connect = require('../index')
const glob = require('glob')
const path = require('path')
const { clearAll } = require('./_functions')

async function start() {
  await connect()
  await clearAll()
  const files = glob.sync('./**/*.seed.js')

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const run = require(path.resolve(file))
    await run()
  }

  if (process.env.NODE_ENV !== 'test') {
    process.exit()
  }
}

if (process.env.NODE_ENV !== 'test') {
  start()
}

module.exports = start

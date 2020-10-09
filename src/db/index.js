const mongoose = require('mongoose')
// const User = require('./models/user')
const colors = require('colors/safe')
const emit = require('../eventEmiter')

function log() {
  console.log(colors.blue(...arguments))
}

function logError() {
  console.log(colors.red.inverse(...arguments))
}

async function connect() {
  let url = process.env.MONGODB_URL || 'mongodb://localhost:27017/api'
  if (process.env.NODE_ENV) url = 'mongodb://localhost:27017/api_testing'

  try {
    await mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    )
    log('---')
    log('Connected to MONGO DB')
    log('> url:', url)
    log('---')

    emit.emit('db:connected')
  } catch (error) {
    logError('\n\n----\nError connecting to DB:\n\n', '> url:', url, '\n\n', error, '\n\n----\n')
  }
}

require('./models')

module.exports = connect

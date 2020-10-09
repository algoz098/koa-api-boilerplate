const mongoose = require('mongoose')
const colors = require('colors')
const connect = require('../index')

async function batch(amount = 1, model, shouldSave = false) {
  if (mongoose.connection.readyState !== 1) return console.error('DB NOT CONNECTED YET')

  const factory = require(`../factories/${model}.factory`)
  const models = []

  for (let index = 1; index <= amount; index++) {
    const model = factory()

    models.push(model)
    if (shouldSave) await model.save()
  }
}

async function clearAll() {
  if (mongoose.connection.readyState !== 1) {
    await connect()
  }

  console.log(colors.yellow.inverse('DELETING ALL DATABASE'))
  return mongoose.connection.db.dropDatabase()
}

module.exports = {
  batch,
  clearAll
}

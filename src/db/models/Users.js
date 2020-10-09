const mongoose = require('mongoose')
const { Schema } = mongoose
const { hash } = require('../../bcrypt')

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

schema.pre('save', async function() {
  if (this.password) {
    this.password = await hash(this.password)
  }
})

schema.methods.toReturn = function() {
  const result = JSON.parse(JSON.stringify(this))
  delete result.password
  delete result.__v
  return result
}

const User = mongoose.model('users', schema)

module.exports = User

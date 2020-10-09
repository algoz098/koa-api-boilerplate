const bcrypt = require('bcrypt')

const rounds = 10

function hash(toHash) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(toHash, rounds, (err, hash) => {
      if (err) reject(err)

      resolve(hash)
    })
  })
}

function compare(toCompare, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(toCompare, hash, (_err, res) => {
      if (res) resolve(true)

      resolve(false)
    })
  })
}

module.exports = {
  hash,
  compare
}

const { batch } = require('./_functions')
const colors = require('colors')

const UserFactory = require('../factories/Users.factory')

async function run() {
  const user = UserFactory()
  user.email = 't@t.com'
  await user.save()

  console.log(colors.yellow('Seeding users'))
  await batch(3, 'Users', true)
  console.log(colors.yellow('Seeding users DONE'))
}

module.exports = run

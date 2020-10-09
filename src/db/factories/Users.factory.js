const User = require('../models/Users')
const faker = require('faker')

function create() {
  const created = new User()
  created.name = faker.name.findName()
  created.email = faker.internet.email()
  created.password = 't'
  created.createdAt = faker.date.recent()
  created.updatedAt = faker.date.recent()
  return created
}

module.exports = create

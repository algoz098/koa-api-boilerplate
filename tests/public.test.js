const request = require('supertest')
const app = require('../src')
const seed = require('../src/db/seed/index.js')
const mongoose = require('mongoose')

beforeAll(async done => {
  await seed()
  done()
})

test('[GET] /public - return a file', async() => {
  const response = await request(app.callback())
    .get('/public/hello.txt')

  expect(response.status).toBe(200)
})

test('[GET] /public - return 404', async() => {
  const response = await request(app.callback())
    .get('/public/error')

  expect(response.status).toBe(404)
})

afterAll(async done => {
  await mongoose.connection.close()

  done()
})

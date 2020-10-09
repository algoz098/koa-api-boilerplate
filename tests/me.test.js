const request = require('supertest')
const app = require('../src')
const seed = require('../src/db/seed/index.js')
const mongoose = require('mongoose')

let token
beforeAll(async done => {
  await seed()

  const payload = {
    email: 't@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  token = response.body.token

  done()
})

test('[GET] /me - can acess with query token', async() => {
  const response = await request(app.callback())
    .get(`/me?token=${token}`)

  expect(response.status).toBe(200)
  expect(response.body).toHaveProperty('_id')
  expect(response.body).toHaveProperty('createdAt')
  expect(response.body).toHaveProperty('updatedAt')
  expect(response.body).toHaveProperty('name')
  expect(response.body).toHaveProperty('email')
})

test('[GET] /me - can acess with header token', async() => {
  const response = await request(app.callback())
    .get('/me')
    .set({ Authorization: `Bearer ${token}` })

  expect(response.status).toBe(200)
  expect(response.body).toHaveProperty('_id')
  expect(response.body).toHaveProperty('createdAt')
  expect(response.body).toHaveProperty('updatedAt')
  expect(response.body).toHaveProperty('name')
  expect(response.body).toHaveProperty('email')
})

test('[GET] /me - needs a token', async() => {
  const response = await request(app.callback())
    .get('/me')

  expect(response.status).toBe(401)
})
afterAll(async done => {
  await mongoose.connection.close()

  done()
})

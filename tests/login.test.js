const request = require('supertest')
const app = require('../src')
const seed = require('../src/db/seed/index.js')
const mongoose = require('mongoose')

beforeAll(async done => {
  await seed()
  done()
})

test('[POST] /login - can login', async() => {
  const payload = {
    email: 't@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  expect(response.status).toBe(200)
  expect(response.body).toHaveProperty('token', 'type', 'expiration')
})

test('[POST] /login - need a email', async() => {
  const payload = {
    password: 't'
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('email')
})

test('[POST] /login - need a password', async() => {
  const payload = {
    email: 't@t.com',
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('password')
})

test('[POST] /login - need a valid password', async() => {
  const payload = {
    email: 't@t.com',
    password: 't2'
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  expect(response.status).toBe(401)
  expect(response.body).toHaveProperty('code')
  expect(response.body).toHaveProperty('message')
})

test('[POST] /login - need a valid email', async() => {
  const payload = {
    email: 't2@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/login')
    .send(payload)

  expect(response.status).toBe(401)
  expect(response.body).toHaveProperty('code')
  expect(response.body).toHaveProperty('message')
})

afterAll(async done => {
  await mongoose.connection.close()

  done()
})

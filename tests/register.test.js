const request = require('supertest')
const app = require('../src')
const seed = require('../src/db/seed/index.js')
const mongoose = require('mongoose')

beforeAll(async done => {
  await seed()
  done()
})

test('[POST] /register - can register', async() => {
  const payload = {
    name: 'test name',
    email: 't99999@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(201)
  expect(response.body).toHaveProperty('_id')
  expect(response.body).toHaveProperty('createdAt')
  expect(response.body).toHaveProperty('updatedAt')
  expect(response.body).toHaveProperty('name')
  expect(response.body).toHaveProperty('email')
})

test('[POST] /register - need a email', async() => {
  const payload = {
    name: 'test name',
    // email: 't2@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('email')
})

test('[POST] /register - need a password', async() => {
  const payload = {
    name: 'test name',
    email: 't2@t.com',
    // password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('password')
})

test('[POST] /register - need a name', async() => {
  const payload = {
    // name: 'test name',
    email: 't2@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('name')
})

test('[POST] /register - need a valid name', async() => {
  const payload = {
    name: '1',
    email: 't2@t.com',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('name')
})

test('[POST] /register - need a valid email', async() => {
  const payload = {
    name: 'test name',
    email: 'email',
    password: 't'
  }
  const response = await request(app.callback())
    .post('/register')
    .send(payload)

  expect(response.status).toBe(400)
  expect(response.body).toHaveProperty('code', 'message', 'errors')
  expect(response.body.errors.body[0].field).toBe('email')
})

afterAll(async done => {
  await mongoose.connection.close()

  done()
})

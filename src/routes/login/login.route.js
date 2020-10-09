const request = require('./login.request.joi')
const response = require('./login.response.joi')
const errorResponse = require('../defaultError.response.joi')
const { route } = require('../route')
const handler = require('./login.handler')

const routeDef = {
  method: 'post',
  path: '/login',
  meta: {
    swagger: {
      summary: 'Login',
      description: 'Used to create a access token',
      tags: ['users']
    }
  },
  validate: {
    continueOnError: true,
    body: request,
    type: 'json',
    output: {
      200: {
        body: response
      },
      '400-499': {
        body: errorResponse
      }
    }
  },
  handler
}

route.route(routeDef)

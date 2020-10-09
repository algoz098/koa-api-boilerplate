const request = require('./register.request')
const response = require('./register.response.joi')
const errorResponse = require('../defaultError.response.joi')
const { route } = require('../route')
const handler = require('./register.handler')

const routeDef = {
  method: 'post',
  path: '/register',
  meta: {
    swagger: {
      summary: 'Register',
      description: 'Used to create a user',
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

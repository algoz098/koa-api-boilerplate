const response = require('./me.response.joi')
const { route } = require('../route')
const handler = require('./me.handler')

const routeDef = {
  method: 'get',
  path: '/me',
  meta: {
    swagger: {
      summary: 'Me',
      description: 'Used to handle information about the signed account',
      tags: ['users']
    }
  },
  validate: {
    // type: 'json',
    // output: {
    //   200: {
    //     body: response
    //   }
    // }
  },

  handler
}

route.route(routeDef)

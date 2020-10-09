// const response = require('./me.response.joi')
const { route } = require('../route')
const handler = require('./public.handler')

const routeDef = {
  method: 'get',
  path: '/public/:file',
  meta: {
    swagger: {
      summary: 'Public',
      description: 'Used to get static files',
      tags: ['public']
    }
  },
  // validate: {
  //   // type: 'json',
  //   // output: {
  //   //   200: {
  //   //     body: response
  //   //   }
  //   // }
  // },

  handler
}

route.route(routeDef)

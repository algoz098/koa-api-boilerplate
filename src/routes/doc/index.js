const { route } = require('../route')
const { SwaggerAPI } = require('koa-joi-router-docs')

const generator = new SwaggerAPI()
generator.addJoiRouter(route)

const spec = generator.generateSpec({
  info: {
    title: 'Example API',
    description: 'API for creating and editing examples.',
    version: '1.1',
  },
})

route.get('/api.json', async ctx => {
  ctx.body = spec
})

route.get('/docs', async ctx => {
  ctx.body = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Example API</title>
  </head>
  <body>
    <redoc spec-url='/api.json' lazy-rendering></redoc>
    <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
  </body>
  </html>
  `
  ctx.set('Content-Type', 'text/html')
})

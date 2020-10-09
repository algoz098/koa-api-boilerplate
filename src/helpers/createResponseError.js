const app = require('../app')

app.context.createResponseError = function(code = 400, message = 'Invalid request', errors = undefined) {
  const result = {
    code,
    message,
    errors
  }
  this.status = result.code
  this.body = result
  return result
}

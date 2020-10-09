const app = require('../app')

app.context.validateRequest = function() {
  if (!this.invalid) return

  const errors = {}

  for (const key in this.invalid) {
    if (this.invalid.hasOwnProperty(key)) {
      const error = this.invalid[key]

      errors[key] = []
      for (let indexA = 0; indexA < error.details.length; indexA++) {
        const item = error.details[indexA]
        errors[key].push({
          message: item.message,
          type: item.message,
          field: item.path[0]
        })
      }
    }
  }

  return this.createResponseError(400, 'validationError', errors)
}

const fs = require('fs')
const path = require('path')

async function handler(ctx) {
  const filepath = path.join(__dirname, '../../../public', ctx.params.file)
  const stream = fs.createReadStream(filepath)
  ctx.type = path.extname(filepath)
  ctx.body = stream
}

module.exports = handler

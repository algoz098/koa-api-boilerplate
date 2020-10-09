const colors = require('colors/safe')
function onError(err, ctx) {
  if (err.message.includes('Authentication Error')) return
  const message = `---\nATTENTION\n---\n ERROR ON KOA:\n${err}\n`
  console.error(colors.red.inverse(message), err.stack, colors.red.inverse('\n---'))
}

module.exports = onError

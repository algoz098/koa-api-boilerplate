const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const emit = new MyEmitter()

module.exports = emit

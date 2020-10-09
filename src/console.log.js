const log = console

// eslint-disable-next-line no-global-assign
console = {
  log() {
    if (process.env.NODE_ENV === 'test') return
    log.log(...arguments)
  },
  error() {
    if (process.env.NODE_ENV === 'test') return
    log.error(...arguments)
  },
  time() {
    if (process.env.NODE_ENV === 'test') return
    log.time(...arguments)
  },
  timeEnd() {
    if (process.env.NODE_ENV === 'test') return
    log.timeEnd(...arguments)
  }
}

module.exports = console

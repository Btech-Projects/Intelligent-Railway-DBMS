const isInstalled = require('.')
// eslint-disable-next-line node/no-unpublished-require
const tape = require('tape')

tape.test('isInstalled', (t) => {
  t.true(isInstalled('ls'))
  t.false(isInstalled('something-that-does-not-exist'))
  t.end()
})

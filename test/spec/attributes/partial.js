import test from 'ava'
import compile from '../../helpers/compile'
import escape from 'escape-html'
import path from 'path'

test('[partial]', async assert => {
  const { template } = await compile(`<head partial="./head.html"></head>`, {
    paths: [ path.join(__dirname, '../../fixtures/partial') ]
  })
  assert.deepEqual(template({}, escape), '<head><meta charset="utf-8"></head>')
})

test('[partial]: passes attributes', async assert => {
  const { template } = await compile(`<div partial="./foo.html" bar="qux" baz="quux"></div>`, {
    paths: [ path.join(__dirname, '../../fixtures/partial/attributes') ]
  })
  assert.deepEqual(template({}, escape), '<div>quxquux</div>')
})

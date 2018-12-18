import test from '../../../helpers/test'
import compile from '../../../helpers/compile'
import path from 'path'
import escape from 'escape-html'

test('script: inline strings', async assert => {
  const template = await compile(`<script inline>const foo = "bar"</script>{foo}`)
  assert.deepEqual(template({}, escape), 'bar')
})

test('script: inline arrays', async assert => {
  const template = await compile(`<script inline>const foo = ['bar', 'baz']</script><for qux in foo>{qux}</for>`)
  assert.deepEqual(template({}, escape), 'barbaz')
})

test('script: inline functions', async assert => {
  const template = await compile(`<script inline>const year = () => 2018</script>{year()}`)
  assert.deepEqual(template({}, escape), '2018')
})

test('script: inline for a js file', async assert => {
  const template = await compile(`<script src="./foo.js" inline></script>`, { paths: [path.join(__dirname, '../../../fixtures/scripts')] })
  assert.deepEqual(template({}, escape), `<script>console.log('foo')\n</script>`)
})

test('script: global inline for a js file', async assert => {
  const template = await compile(`<script src="./foo.js"></script>`, { paths: [path.join(__dirname, '../../../fixtures/scripts')], inline: ['scripts'] })
  assert.deepEqual(template({}, escape), `<script>console.log('foo')\n</script>`)
})

test('script: inline throws if the file does not exist', async assert => {
  await assert.throwsAsync(
    compile(`<script src='./foo.js' inline></script>`, { paths: [] }),
    /Asset not found: \.\/foo\.js/
  )
})

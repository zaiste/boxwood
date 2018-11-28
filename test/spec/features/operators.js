import test from '../../helpers/test'
import compile from '../../helpers/compile'
import escape from 'escape-html'

test('operators: addition', async assert => {
  let template

  template = await compile('{2 + 2}')
  assert.deepEqual(template({}, escape), '4')

  template = await compile('{foo + 2}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{2 + foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{foo + foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{foo + bar}')
  assert.deepEqual(template({ foo: 2, bar: 2 }, escape), '4')

  template = await compile('{foo + bar}')
  assert.deepEqual(template({}, escape), 'NaN')
})

test('operators: subtraction', async assert => {
  let template

  template = await compile('{2 - 2}')
  assert.deepEqual(template({}, escape), '0')

  template = await compile('{foo - 2}')
  assert.deepEqual(template({ foo: 2 }, escape), '0')

  template = await compile('{2 - foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '0')

  template = await compile('{foo - foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '0')

  template = await compile('{foo - bar}')
  assert.deepEqual(template({ foo: 2, bar: 2 }, escape), '0')

  template = await compile('{foo - bar}')
  assert.deepEqual(template({}, escape), 'NaN')
})

test('operators: multiplication', async assert => {
  let template

  template = await compile('{2 * 2}')
  assert.deepEqual(template({}, escape), '4')

  template = await compile('{foo * 2}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{2 * foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{foo * foo}')
  assert.deepEqual(template({ foo: 2 }, escape), '4')

  template = await compile('{foo * bar}')
  assert.deepEqual(template({ foo: 2, bar: 2 }, escape), '4')

  template = await compile('{foo * bar}')
  assert.deepEqual(template({}, escape), 'NaN')
})

test('operators: exponentiation', async assert => {
  let template

  template = await compile('{2 ** 3}')
  assert.deepEqual(template({}, escape), '8')

  template = await compile('{foo ** 3}')
  assert.deepEqual(template({ foo: 3 }, escape), '27')

  template = await compile('{2 ** foo}')
  assert.deepEqual(template({ foo: 3 }, escape), '8')

  template = await compile('{foo ** foo}')
  assert.deepEqual(template({ foo: 3 }, escape), '27')

  template = await compile('{foo ** bar}')
  assert.deepEqual(template({ foo: 2, bar: 3 }, escape), '8')

  template = await compile('{foo ** bar}')
  assert.deepEqual(template({}, escape), 'NaN')
})

test('operators: logical and', async assert => {
  let template

  template = await compile('{foo && bar}')
  assert.deepEqual(template({ foo: true, bar: true }, escape), 'true')

  template = await compile('{foo && bar}')
  assert.deepEqual(template({ foo: true, bar: false }, escape), 'false')

  template = await compile('{foo && bar}')
  assert.deepEqual(template({ foo: false, bar: true }, escape), 'false')

  template = await compile('{foo && bar}')
  assert.deepEqual(template({ foo: false, bar: false }, escape), 'false')
})

test('operators: logical or', async assert => {
  let template

  template = await compile('{foo || bar}')
  assert.deepEqual(template({ foo: true, bar: true }, escape), 'true')

  template = await compile('{foo || bar}')
  assert.deepEqual(template({ foo: true, bar: false }, escape), 'true')

  template = await compile('{foo || bar}')
  assert.deepEqual(template({ foo: false, bar: true }, escape), 'true')

  template = await compile('{foo || bar}')
  assert.deepEqual(template({ foo: false, bar: false }, escape), 'false')

  template = await compile('{foo || "bar"}')
  assert.deepEqual(template({ foo: 'foo' }, escape), 'foo')

  template = await compile('{foo || "bar"}')
  assert.deepEqual(template({ foo: '' }, escape), 'bar')
})

test('operators: comparison', async assert => {
  let template

  template = await compile('{foo > bar}')
  assert.deepEqual(template({ foo: 1, bar: 0 }, escape), 'true')

  template = await compile('{foo < bar}')
  assert.deepEqual(template({ foo: 1, bar: 0 }, escape), 'false')

  template = await compile('{foo >= bar}')
  assert.deepEqual(template({ foo: 1, bar: 0 }, escape), 'true')

  template = await compile('{foo <= bar}')
  assert.deepEqual(template({ foo: 1, bar: 0 }, escape), 'false')

  template = await compile('{foo.length > 0 ? "active" : "inactive"}')
  assert.deepEqual(template({ foo: ['bar'] }, escape), 'active')
  assert.deepEqual(template({ foo: [] }, escape), 'inactive')
})

test('operators: ternary', async assert => {
  let template

  template = await compile('{foo ? "bar" : "baz"}')
  assert.deepEqual(template({ foo: true }, escape), 'bar')

  template = await compile('{foo ? "bar" : "baz"}')
  assert.deepEqual(template({ foo: false }, escape), 'baz')

  template = await compile('{foo ? bar : baz}')
  assert.deepEqual(template({ foo: true, bar: 'bar', baz: 'baz' }, escape), 'bar')

  template = await compile('{foo ? bar : baz}')
  assert.deepEqual(template({ foo: false, bar: 'bar', baz: 'baz' }, escape), 'baz')

  template = await compile('{foo.bar ? bar : baz}')
  assert.deepEqual(template({ foo: { bar: true }, bar: 'bar', baz: 'baz' }, escape), 'bar')

  template = await compile('{foo.bar ? bar : baz}')
  assert.deepEqual(template({ foo: { bar: false }, bar: 'bar', baz: 'baz' }, escape), 'baz')

  template = await compile('{foo.bar ? bar.baz : baz.qux}')
  assert.deepEqual(template({ foo: { bar: true }, bar: { baz: 'bar' }, baz: { qux: 'baz' } }, escape), 'bar')

  template = await compile('{foo.bar ? bar.baz : baz.qux}')
  assert.deepEqual(template({ foo: { bar: false }, bar: { baz: 'bar' }, baz: { qux: 'baz' } }, escape), 'baz')

  template = await compile('{ foo ? foo + "bar" : "" }')
  assert.deepEqual(template({ foo: 'foo' }, escape), 'foobar')

  template = await compile('{ foo ? foo + "bar" : "" }')
  assert.deepEqual(template({ foo: '' }, escape), '')

  template = await compile('{ foo ? foo + "bar" : "" }')
  assert.deepEqual(template({ foo: undefined }, escape), '')
})

test.skip('operators: ternary operator works with computed object property access', async assert => {
  let template

  template = await compile('{ foo[bar] ? "foo" : "bar" }')
  assert.deepEqual(template({ foo: { bar: true }, bar: 'bar' }, escape), 'foo')

  template = await compile('{ foo[bar] ? "foo" : "bar" }')
  assert.deepEqual(template({ foo: { bar: false }, bar: 'bar' }, escape), 'bar')
})

test.skip('operators: works for multiple variables', async assert => {
  const template = await compile('{foo > bar && baz > qux}')
  assert.deepEqual(template({ foo: 1, bar: 0, baz: 1, qux: 0 }, escape), 'true')
})

const assert = require('assert')
const { extract } = require('./string')

assert.deepEqual(extract('foo'), [{ type: 'text', value: 'foo' }])
assert.deepEqual(extract('bar'), [{ type: 'text', value: 'bar' }])
assert.deepEqual(extract('{foo}'), [{ type: 'expression', value: '{foo}' }])
assert.deepEqual(extract('{bar}'), [{ type: 'expression', value: '{bar}' }])
assert.deepEqual(extract('foo bar'), [{ type: 'text', value: 'foo bar' }])
assert.deepEqual(extract('foo {bar}'), [{ type: 'text', value: 'foo ' }, { type: 'expression', value: '{bar}' }])
assert.deepEqual(extract('{foo} bar'), [{ type: 'expression', value: '{foo}' }, { type: 'text', value: ' bar' }])
assert.deepEqual(extract('{foo} {bar}'), [{ type: 'expression', value: '{foo}' }, { type: 'text', value: ' ' }, { type: 'expression', value: '{bar}' }])
assert.deepEqual(extract('foo bar {baz}'), [{ type: 'text', value: 'foo bar ' }, { type: 'expression', value: '{baz}' }])
assert.deepEqual(extract('foo {bar} baz'), [{ type: 'text', value: 'foo ' }, { type: 'expression', value: '{bar}' }, { type: 'text', value: ' baz' }])
assert.deepEqual(extract('foo     bar'), [{ type: 'text', value: 'foo     bar' }])
assert.deepEqual(extract('   foo     bar    '), [{ type: 'text', value: 'foo     bar' }])
assert.deepEqual(extract('foo-{bar}'), [{ type: 'text', value: 'foo-' }, { type: 'expression', value: '{bar}' }])
assert.deepEqual(extract('{foo}-{bar}'), [{ type: 'expression', value: '{foo}' }, { type: 'text', value: '-' }, { type: 'expression', value: '{bar}' }])
assert.deepEqual(extract('{foo | uppercase}'), [{ type: 'expression', value: '{foo}', filters: ['uppercase'] }])
assert.deepEqual(extract('{foo | uppercase | lowercase}'), [{ type: 'expression', value: '{foo}', filters: ['uppercase', 'lowercase'] }])
assert.deepEqual(extract('{foo | uppercase | lowercase | truncate(25)}'), [{ type: 'expression', value: '{foo}', filters: ['uppercase', 'lowercase', 'truncate(25)'] }])
assert.deepEqual(extract('{1}'), [{ type: 'expression', value: '{1}' }])
assert.deepEqual(extract('{"foo"}'), [{ type: 'expression', value: '{"foo"}' }])
assert.deepEqual(extract('{foo | monetize({ currency: "$", ending: false, space: false })}'), [{ type: 'expression', value: '{foo}', filters: ['monetize({ currency: "$", ending: false, space: false })']}])
assert.deepEqual(extract('{foo | bar({baz: 25}) | monetize({ currency: "$", ending: false, space: false })}'), [{ type: 'expression', value: '{foo}', filters: ['bar({baz: 25})', 'monetize({ currency: "$", ending: false, space: false })']}])
assert.deepEqual(extract('/foo/{bar | first}'), [{ type: 'text', value: '/foo/' }, { type: 'expression', value: '{bar}', filters: ['first'] }])
assert.deepEqual(extract('{foo || bar}'), [{ type: 'expression', value: '{foo || bar}' }])

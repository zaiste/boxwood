'use strict'

const test = require('ava')
const lexer = require('./lexer')

test('lexer: returns tokens', assert => {
  assert.deepEqual(lexer('foo'), [{ type: 'text', value: 'foo' }])
  assert.deepEqual(lexer('bar'), [{ type: 'text', value: 'bar' }])
  assert.deepEqual(lexer('{foo}'), [{ type: 'expression', value: 'foo' }])
  assert.deepEqual(lexer('{bar}'), [{ type: 'expression', value: 'bar' }])
  assert.deepEqual(lexer('foo bar'), [{ type: 'text', value: 'foo bar' }])
  assert.deepEqual(lexer('foo {bar}'), [{ type: 'text', value: 'foo ' }, { type: 'expression', value: 'bar' }])
  assert.deepEqual(lexer('{foo} bar'), [{ type: 'expression', value: 'foo' }, { type: 'text', value: ' bar' }])
  assert.deepEqual(lexer('{foo} {bar}'), [{ type: 'expression', value: 'foo' }, { type: 'text', value: ' ' }, { type: 'expression', value: 'bar' }])
  assert.deepEqual(lexer('foo bar {baz}'), [{ type: 'text', value: 'foo bar ' }, { type: 'expression', value: 'baz' }])
  assert.deepEqual(lexer('foo {bar} baz'), [{ type: 'text', value: 'foo ' }, { type: 'expression', value: 'bar' }, { type: 'text', value: ' baz' }])
  assert.deepEqual(lexer('foo     bar'), [{ type: 'text', value: 'foo     bar' }])
  assert.deepEqual(lexer('   foo     bar    '), [{ type: 'text', value: '   foo     bar    ' }])
  assert.deepEqual(lexer('foo-{bar}'), [{ type: 'text', value: 'foo-' }, { type: 'expression', value: 'bar' }])
  assert.deepEqual(lexer('{foo}-{bar}'), [{ type: 'expression', value: 'foo' }, { type: 'text', value: '-' }, { type: 'expression', value: 'bar' }])
  assert.deepEqual(lexer('{foo | uppercase}'), [{ type: 'expression', value: 'foo | uppercase' }])
  assert.deepEqual(lexer('{foo | uppercase | lowercase}'), [{ type: 'expression', value: 'foo | uppercase | lowercase' }])
  assert.deepEqual(lexer('{foo | uppercase | lowercase | truncate(25)}'), [{ type: 'expression', value: 'foo | uppercase | lowercase | truncate(25)' }])
  assert.deepEqual(lexer('{1}'), [{ type: 'expression', value: '1' }])
  assert.deepEqual(lexer('{"foo"}'), [{ type: 'expression', value: '"foo"' }])
  assert.deepEqual(lexer('{foo || bar}'), [{ type: 'expression', value: 'foo || bar' }])
  assert.deepEqual(lexer('/foo/{bar | first}'), [{ type: 'text', value: '/foo/' }, { type: 'expression', value: 'bar | first' }])
  assert.deepEqual(lexer('{foo | bar({baz: 25}) | monetize({ currency: "$", ending: false, space: false })}'), [{ type: 'expression', value: 'foo | bar({baz: 25}) | monetize({ currency: "$", ending: false, space: false })' }])
  assert.deepEqual(lexer('{foo | monetize({ currency: "$", ending: false, space: false })}'), [{ type: 'expression', value: 'foo | monetize({ currency: "$", ending: false, space: false })' }])
})

test('lexer: handles template literals', assert => {
  assert.deepEqual(lexer('{`${user.firstName}, ${user.lastName}`}'), [{ type: 'expression', value: '`${user.firstName}, ${user.lastName}`' }])
})

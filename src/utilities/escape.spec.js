'use strict'

const test = require('ava')
const escape = require('./escape')

test('it escapes strings', assert => {
  assert.deepEqual(escape(undefined), 'undefined')
  assert.deepEqual(escape(null), 'null')
  assert.deepEqual(escape({}), '[object Object]')
  assert.deepEqual(escape('"'), '&quot;')
  assert.deepEqual(escape('"bar'), '&quot;bar')
  assert.deepEqual(escape('foo"'), 'foo&quot;')
  assert.deepEqual(escape('foo"bar'), 'foo&quot;bar')
  assert.deepEqual(escape('foo""bar'), 'foo&quot;&quot;bar')
  assert.deepEqual(escape('&'), '&amp;')
  assert.deepEqual(escape('&bar'), '&amp;bar')
  assert.deepEqual(escape('foo&'), 'foo&amp;')
  assert.deepEqual(escape('foo&bar'), 'foo&amp;bar')
  assert.deepEqual(escape('foo&&bar'), 'foo&amp;&amp;bar')
  assert.deepEqual(escape("'"), '&#39;')
  assert.deepEqual(escape("'bar"), '&#39;bar')
  assert.deepEqual(escape("foo'"), 'foo&#39;')
  assert.deepEqual(escape("foo'bar"), 'foo&#39;bar')
  assert.deepEqual(escape("foo''bar"), 'foo&#39;&#39;bar')
  assert.deepEqual(escape('<'), '&lt;')
  assert.deepEqual(escape('<bar'), '&lt;bar')
  assert.deepEqual(escape('foo<'), 'foo&lt;')
  assert.deepEqual(escape('foo<bar'), 'foo&lt;bar')
  assert.deepEqual(escape('foo<<bar'), 'foo&lt;&lt;bar')
  assert.deepEqual(escape('>'), '&gt;')
  assert.deepEqual(escape('>bar'), '&gt;bar')
  assert.deepEqual(escape('foo>'), 'foo&gt;')
  assert.deepEqual(escape('foo>bar'), 'foo&gt;bar')
  assert.deepEqual(escape('foo>>bar'), 'foo&gt;&gt;bar')
  assert.deepEqual(escape('&foo <> bar "fizz" l\'a'), '&amp;foo &lt;&gt; bar &quot;fizz&quot; l&#39;a')
})

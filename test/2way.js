var tape = require('tape')
var d = require('../')

  function split(a) {
    if('string' === typeof a)
      return a.split('')
    return a
  }

  function test (a, b, lcs) {
    tape('lcs '+a+' '+b+' == '+lcs, function (assert) {
      a = split(a)
      b = split(b)
      lcs = split(lcs)
      var _lcs = d.lcs(a, b)
      d.chunk([a, b], console.log)
      assert.deepEqual(_lcs, lcs)
      var changes = d.diff(a,b)
      console.log('PATCH', changes)
      var newA = d.patch(a, changes)
      assert.deepEqual(newA, b)
      assert.end()
    })
  }

  test('AA', 'AA', 'AA')
  test('AB', 'BA', 'A')
  test('ABA', 'BAA', 'AA')
  test('AAX', 'AAAX', 'AAX')
  test('AAAX', 'AAX',  'AAX')
  test('TANYANA', 'BANANA', 'ANANA')
  // the naive model takes 2.5 seconds to find this:
  // time to optimise...
  test('aoenuthooao', 'eukmcybkraoaeuo', 'aoeuo')
  test('aoenuthooaeuoao', 'eukipoimcybkraoaeuo', 'euooaeuo')
  // added caching... now it's way faster.


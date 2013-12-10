var tape = require('tape')

require('es5-shim')

function log () {
  var args = []
  for (var i in arguments) 
    args.push(arguments[i])
  console.log(JSON.stringify(args))
}

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
      console.log('LOG', d.chunk([a, b], log))
      assert.deepEqual(_lcs, lcs)
      var changes = d.diff(a,b)
      log('PATCH', changes)
      var newA = d.patch(a, changes)
      assert.deepEqual(newA, b)
      assert.end()
    })
  }

  test('AA', 'AA', 'AA')
  test('AB', 'BA', 'A')
  test('ABA', 'BAA', 'AA')
  test('ABchangeA', 'ABABABABBA', 'ABA')
  test('AAX', 'AAAX', 'AAX')
  test('AAAX', 'AAX',  'AAX')
  test('TANYANA', 'BANANA', 'ANANA')
  // the naive model takes 2.5 seconds to find this:
  // time to optimise...
  test('aoenuthooao', 'eukmcybkraoaeuo', 'aoeuo')
  test('aoenuthooaeuoao', 'eukipoimcybkraoaeuo', 'euooaeuo')
  // added caching... now it's way faster.


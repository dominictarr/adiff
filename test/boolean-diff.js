var test = require('tape')
var d = require('../')

test('boolean diff of different lengths',function(t){
  var changes = d.diff([true],[true,true])
  t.deepEqual(changes, [[1,0,true]])
  t.end()
})

test('string diff of different lengths',function(t){
  var changes = d.diff(['A'],['A','A'])
  t.deepEqual(changes, [[1,0,'A']])
  t.end()
})
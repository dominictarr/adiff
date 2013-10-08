require('es5-shim')
require('tape')('tree-test', function (assert) {

function log () {
  var args = []
  for (var i in arguments) 
    args.push(arguments[i])
  console.log(JSON.stringify(args))
}

function listify(tree){
  var a = []
  function cat (b) {
    while(b.length)
      a.push(b.shift())
  }
  if(Array.isArray(tree)) {
    a.push('[')
    
    for (var i in tree) {
     // a.push(i + ':')
      cat(listify(tree[i]))
      a.push(',')
    }
    if(a[a.length - 1 ] == ',') a.pop()
    a.push(']')
  } else if ('object' == typeof tree) {

    a.push('{')
 
    for (var i in tree) {
      a.push(i + ':')
      cat(listify(tree[i]))
      a.push(',')
    }
    if(a[a.length - 1] == ',') a.pop()
    
    a.push('}')
  } else
    return [JSON.stringify(tree)]
  return a
}


var d = require('../')

assert.deepEqual(listify({hello: {}}), ['{', 'hello:','{', '}','}'])

diff3(
  {hello: {value: 250}, bye: 'ok'}, 
  {hello: 250, bye: 'ok'},
  {hello: 250, bye: 'okay'}
)

diff3 (
  {hello: {whatever: true}, value: null},
  {hello: 'hello', value: {whatever: true}},
  {hello: 'hello', value: {whatever: true, changed: 'YES'}}
)


function diff3 () {
  var args = [].slice.call(arguments).map(listify)
  log(args)
  var x = d.diff3.apply(null, args)
  log('DIFF', x)
}

assert.end()

})

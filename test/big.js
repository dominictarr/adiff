var a = require('..')
var tape = require('tape')

require('es5-shim')

function log () {
  var args = []
  for (var i in arguments) 
    args.push(arguments[i])
  console.log(JSON.stringify(args))
}

function test(n, times) {

tape ('big '+n+'x'+times, function (t) {

  var start = Date.now()
  var big = [], l = n

  function random() {
    return 'hello'+Math.random()
  }

  while(l--)
    big.push(random())

  function randomChange(big) {
    var _big = big.slice()
    //if (Math.random() < 0.3) {
      var insert = []
      while(Math.random() < 0.7)
        insert.push(random())
    
      insert.unshift(~~(Math.random()*insert.length*2)) //deletes
      insert.unshift(~~(Math.random()*big.length))     //insert index
      _big.splice.apply(_big, insert)
  //  }
    return _big
  }

  while(times --) {
    var _big = randomChange(big)
    var p = a.diff(big, _big)
    t.deepEqual(_big, a.patch(big, p, true))
  }

  log('TIME('+n+') = ', n/(Date.now() - start))
  t.end()
})

}

test(10  , 10)
test(100 , 10)
test(200 , 10)
test(500 , 10)
test(600 , 10)
test(800 , 10)
test(1000, 10)
test(10000, 10)


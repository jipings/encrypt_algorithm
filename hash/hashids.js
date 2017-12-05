var Hashids = require('hashids');

var hashids = new Hashids();

var id = hashids.encode(1, 2, 3); // o2fXhV
var numbers = hashids.decode(id); // [1, 2, 3]

console.log(id, numbers);
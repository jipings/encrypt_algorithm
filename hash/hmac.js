var crypto = require('crypto');

var fs = require('fs');

var pem = fs.readFileSync('../key.pem');

var key = pem.toString('ascii');
console.log('key', key);

var shasum = crypto.createHmac('sha1', key);
// 1，创建一个 hmac 对象

var s = fs.ReadStream('./hash.md');

s.on('data', function(d) {
    shasum.update(d);
// 2，通过 hmac 对象 update 方法来创建一个摘要。
});

s.on('end', function() {
    var d = shasum.digest('hex');
    // 3，输出摘要内容
    console.log(d);
})
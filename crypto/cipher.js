// 使用Cipher 对象加密数据

var crypto = require('crypto');
var fs = require('fs');

var pem = fs.readFileSync('key.pem');
// console.log(pem);
var key = pem.toString('ascii');
var cipher = crypto.createCipher('aes-256-cbc', key);
var text = 'test';
cipher.update(text, 'binary', 'hex');
var crypted = cipher.final('hex');

console.log(crypted);
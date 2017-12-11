// 使用Cipher 对象加密数据
// http://blog.fens.me/nodejs-crypto/
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

// 加密

function doCipher(algorithm, key, buf, cb) {
    // 加密方式 秘钥 需要加密的数据  回调函数
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
};

doCipher('aes-256-cbc', key, 'test', (encrypted) => {console.log(encrypted)});

// 解密

function decipher(algorithm, key, encrypted, cb) {
    // 加密方式 秘钥 密文 回调函数
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    cb(decrypted);
};
decipher('aes-256-cbc', key,crypted, (data) => {console.log(data)});
// console.log(crypto.getCiphers());

// 加解密性能测试

function cipherDecipherFile(filename, algorithm, key) {
    fs.readFile(filename, 'utf-8', function(err,data) {
        if(err) throw err;
        var s1 = new Date();

        doCipher(algorithm, key, data, function(encrypted){
            var s2 = new Date();
            console.log('cipher:'+algorithm+','+(s2-s1)+'ms');
            decipher(algorithm,key,encrypted,function(text) {
                var s3 = new Date();
                console.log('decipher:'+ algorithm+','+(s3-s2)+'ms');
                console.log(text);
            });
        });
    });
};

var algs = ['blowfish','aes-256-cbc','cast','des','des3','idea','rc2','rc4','seed'];
var filename = './abc';
algs.forEach(function(name) {
    cipherDecipherFile(filename, name, 'abc');
})
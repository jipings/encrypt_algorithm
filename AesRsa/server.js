const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const untils = require('./untils');
const privateKey = fs.readFileSync('./key.pem').toString();
// console.log(untils);

const server = http.createServer((req, res) => {
    // console.log(req.url);

    if(req.url) {
        const keyIndex = req.url.indexOf('=');
        const reqKey = new Buffer(req.url.substr(keyIndex+1), 'base64');
        // 解密出对称加密的 需要使用到的密钥
        // console.log(reqKey);
       const aesKey =  crypto.privateDecrypt(privateKey, reqKey);
       // 使用对称加密 加密服务端传输的数据
       const data = 'This is the test data for the server, you need to encrypt it';
       untils.doCipher('aes-128-cbc', aesKey, data, function(encodeData) {
        res.end(encodeData);
       });
    }
});

server.listen(3000, () => {console.log('🌍 => formServer listen on localhost:3000')});
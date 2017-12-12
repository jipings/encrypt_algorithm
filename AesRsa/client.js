const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const untils = require('./untils');
const publicKey = fs.readFileSync('./publicKey.pem').toString();

const key = new Buffer(untils.randomWord(false, 16));

const encodeKey = crypto.publicEncrypt(publicKey, key).toString('base64');
// console.log(encodeKey);
const req = http.request({
    host: 'localhost',
    method:'GET',
    port:3000,
    headers: {
        'Content-Type': 'application/json'
    },
    path: '/search?key='+encodeKey
}, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`响应主体: ${chunk}`);
      untils.decipher('aes-128-cbc', key, chunk, function(data) {
          console.log('解密数据:'+data);
      })
    });
    res.on('end', () => {
      console.log('响应中已无数据。');
    })}
);
req.end();
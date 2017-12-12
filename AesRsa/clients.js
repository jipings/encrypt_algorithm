// const JSEncrypt = require('jsencrypt').JSEncrypt;
// const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const fs = require('fs');



const publicKey = fs.readFileSync('./publicKey.pem').toString();

const encodeData = new Buffer('123qweqwe');
// console.log(publicKey, encodeData);

const encodeKey = crypto.publicEncrypt(publicKey,encodeData);

const privateKey = fs.readFileSync('./key.pem').toString();
const decryptStr = crypto.privateDecrypt(privateKey, encodeKey).toString();
// console.log(decryptStr2, decryptStr);



doCipher('aes-128-cbc', decryptStr, 'asdqwa-test', function(data) {
    console.log(data);
    decipher('aes-128-cbc', encodeData, data, function(ccc) {console.log(ccc)})
});
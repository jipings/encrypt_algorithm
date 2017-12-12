/* 
加密解密模块
*/

const crypto = require('crypto');

function doCipher(algorithm, key, buf, cb) {
    /**
     * @param algorithm:{string} 加密方式
     * @param key: string 密钥
     * @param buf: string 需要加密的数据
     * @param cb: fun 
     */
    // 加密方式 秘钥 需要加密的数据  回调函数
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
};

function decipher(algorithm, key, encrypted, cb) {
    // 加密方式 秘钥 密文 回调函数
     /**
     * @param algorithm: string 加密方式
     * @param key: string 密钥
     * @param encrypted: string 需要解密的数据
     * @param cb: fun 
     */
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    cb(decrypted);
};
function randomWord(randomFlag, min, max){
    /**
     * @param randomFlag {true or false}
     * @param min number 
     * @param max number
     */
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
module.exports = {
    doCipher,
    decipher,
    randomWord,
}
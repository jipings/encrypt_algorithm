
## [公开密钥加密](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)

Node.js 提供了以下4个与公钥加密相关的类。

    1，Cipher类 ：用于加密数据
    2，Decipher类： 用于解密数据
    3，Sign类： 用于生成签名
    4，Verify类： 用于验证签名

在OpenSSL 工具中，可以使用如下命令来为一个私钥创建一个PEM格式的公钥。

    openssl req -key key.pem -new -x509 -out cert.pem

### 1，加密数据

在 crypto 模块中， Cipher类用于对数据进行加密操作。在加密数据之前，首先需要创建一个Cipher对象。
```js
    crypto.createCipher(algorithm, password) 
    // algorithm 加密算法 aes-256-cbc 
    // password 指定加密时使用的密码
```

createCipheriv 方法：该方法使用指定的算法，密码与初始向量（ Initialization Vector， IV ）来创建 cipher 对象

```js
    crypto.createCipheriv(algorithm, password, iv);
```



### 签名验证加密

我们除了对数据进行加密和解密，还需要判断数据在传输过程中，是否真实际和完整，是否被篡改了。那么就需要用到签名和验证的算法，利用不对称加密算法，通过私钥进行数字签名，公钥验证数据的真实性。

1， 生成私钥和公钥
2，利用私钥生成数字签名，再用公钥验证数据 
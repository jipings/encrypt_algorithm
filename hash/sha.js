var jsSHA = require("jssha");

var shaObj = new jsSHA("SHA-512", "TEXT");
shaObj.update("This is a ");
shaObj.update("test");
var hash = shaObj.getHash("ARRAYBUFFER");

console.log(shaObj, hash);

// HEX 16位进制
// HEX, B64, BYTES, or ARRAYBUFFER
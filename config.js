//读取server.conf文件的内容

let fs = require('fs');

let conf = fs.readFileSync('./server.conf');

//先把它丢进数组
let configArr = conf.toString().split('\r\n');
//然后丢进对象

let globalConfig = {};

for(let i = 0; i < configArr.length; i++) {
   globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1];
}


module.exports = globalConfig;



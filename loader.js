//用于读取web下面的所有文件，并导出

//所以第一步，要获取到文件目录
const fs = require('fs');
const config = require('./config');

let file = fs.readdirSync('./' + config.web_path);

//第二步，根据目录，读取文件内容，丢到新的Map

let pathMap = new Map();

for(let i = 0; i < file.length; i++) {
    let temp = require('./' + config.web_path + '/' + file[i]);
    if(temp.path) {
        for(let [key, value] of temp.path) {
            pathMap.set(key, value);
        }
    }
}

module.exports = pathMap;


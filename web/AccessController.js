let accessDao = require('../dao/AccessDao.js');
const url = require('url');
const respUtil = require('../util/RespUtil.js');

let path = new Map();

let queryAccessById = (request, response) => {
    let params = url.parse(request.url, true).query;
    accessDao.queryAccessById(params.username, params.password, (result) => {
        response.writeHead(200);
        response.write(respUtil.writeResult(200, "查询成功", result)); //第一个参数接收string or Buffer
        response.end();
    })
}

path.set('/queryAccessById', queryAccessById);


module.exports.path = path;

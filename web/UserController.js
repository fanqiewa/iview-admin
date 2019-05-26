let userDao = require('../dao/UserDao.js');
const url = require('url');
const respUtil = require('../util/RespUtil.js');
let accessDao = require('../dao/AccessDao.js');

let path = new Map();

let queryUserByName = (request, response) => {
    let params = url.parse(request.url, true).query;
    userDao.queryUserByName(params.username, params.password, (result) => {
        if(result.length != 0) {
            let id = result[0].id;
            let result1ByUsername = result;
            new Promise((resolve, reject) => {
                accessDao.queryAccessById(id, (result) => {
                    let obj = {
                        username : result1ByUsername[0].username,
                        token: result1ByUsername[0].token,
                        access: result[0].access
                    }
                    resolve(obj);
                })
            }).then((res) => {
                response.writeHead(200);
                response.write(respUtil.writeResult(200, "查询成功", res)); //write第一个参数接收string or Buffer
                response.end();
            })
        } else {
            response.writeHead(200);
            response.write(respUtil.writeResult(0, "查询成功", result)); //write第一个参数接收string or Buffer
            response.end();
        }
    })
}

path.set('/queryUserByName', queryUserByName);


module.exports.path = path;


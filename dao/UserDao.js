let dbutil = require("./DButil.js");

//登录查询
let queryUserByName = (username, password, success) =>{
    let querySql = 'select * from user where username = ? and password = ?';
    let params = [username, password];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if(error == null) {
            success(result);
        } else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.queryUserByName = queryUserByName;
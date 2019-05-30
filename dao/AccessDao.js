let dbutil = require("./DButil.js");

//根据ID查询
let queryAccessById = (success) =>{
    let querySql = 'select * from access';
    let params = [];
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

module.exports.queryAccessById = queryAccessById;
const mysql = require('mysql');

let createConnection = () => {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        post: 10086,
        user: 'root',
        password: '123',
        database:'myfirstdemo'
    })
    return connection;
}

module.exports.createConnection = createConnection;
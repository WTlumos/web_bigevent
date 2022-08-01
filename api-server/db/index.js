// 导入mysql模块
const db = require("mysql");

// 创建数据库连接
const connection = db.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: "3306",
    password: "密码",
    database: "my_db_01"
})
connection.connect();
// 向外共享 db 数据库连接对象
module.exports = connection;

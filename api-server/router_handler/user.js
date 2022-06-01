/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */

// 导入数据库操作模块
const db = require("../db/index");
// 导入密码加密模块
const bcrypt = require("bcryptjs");
// 导入jwt模块
const jwt = require("jsonwebtoken");
// 设置
const config = require("../config");

// 注册处理
exports.useReg = (req,res)=>{
    // 获取用户提交的信息
    const userinfo = req.body;
    // console.log(useInfo);

    // 判断用户名和密码是否为空
    // if(!userinfo.username || !userinfo.password){
    //     return res.cc("用户名或密码不能为空");
    // }
    
    // 查询用户名是否被占用
    // 定义sql查询语句
    const sql = 'select * from ev_users where username = ?';
    // 执行sql语句
    db.query(sql,[userinfo.username],(err,results)=>{
        if(err){
            return res.send({status:1,message: err.message});
        }
        /**
         * [
                RowDataPacket {
                    id: 1,
                    username: 'zhangsan',
                    password: '123',
                    nickname: null,
                    email: null,
                    user_pic: null
                }
            ]
         */
        // console.log(results);
        if(results.length>0){
            return res.cc("用户名已被占用，请更换其他用户名！");
        }
        else{

            // bcrypt.hashSync(明文密码, 随机盐的长度)
            userinfo.password = bcrypt.hashSync(userinfo.password,10);
            // console.log(pwd);
            // 注册
            // 定义sql插入语句
            const insql = 'insert into ev_users set ?';
            // 执行sql语句
            // 注册新用户
            // 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
            // 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
            // 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
            db.query(insql,{ username: userinfo.username, password: userinfo.password },(err,results)=>{
                if(err){
                    return res.cc(err,1);
                }
                /**
                 * []
                    OkPacket {
                    fieldCount: 0,
                    affectedRows: 1,
                    insertId: 2,
                    serverStatus: 2,
                    warningCount: 0,
                    message: '',
                    protocol41: true,
                    changedRows: 0
                    }
                */
                // console.log(results);
                if(results.affectedRows!=1){
                    return res.cc("注册失败，请稍后再试");
                }else{
                    return res.cc("注册成功，请登录",0);  
                }
                
            });

        }
    });

    
    
}

// 登录处理
exports.login = (req,res)=>{
    // console.log(req);
    // res.send("login Ok");
    const userinfo = req.body;
    // 查询用户
    const sql = "select * from ev_users where username=?";
    db.query(sql,[userinfo.username],(err,results)=>{
        // 执行 SQL 语句失败
        if(err){
            return res.cc(err);
        }
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if(results.length !=1){
            return res.cc("用户名不存在，请注册");
        }else{
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
            const pwdResult = bcrypt.compareSync(userinfo.password,results[0].password);
            if(!pwdResult){
                return res.cc("密码不正确");
            }else{
                // 生成JWT
                // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
                const user = { ...results[0], password: '', user_pic: '' };
                // 生成 Token 字符串
                const key = jwt.sign(user,config.jwtSecretKey,{
                    // token 有效期为 10 个小时
                    expiresIn: '10h'
                });
                return res.send({
                    status: 0,
                    message: '登录成功',
                    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                    token: 'Bearer '+key
                })
            }
        }
    })
}   
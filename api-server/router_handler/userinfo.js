// 导入数据库模块
const db = require("../db/index");

// 密码加密
const bcryptjs = require("bcryptjs");

// 根据jwt中解析的id获取用户信息
exports.getUserInfo = (req,res)=>{
    // res.send("得到数据");
    // console.log(req.auth);
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    // 注意：req 对象上的 auth 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql,req.auth.id,(err,results)=>{
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err);

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1){
             return res.cc('获取用户信息失败！');
        }

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}

// 更新用户信息 昵称，邮箱
exports.updateUserInfo = (req,res)=>{
    const sql = 'update ev_users set ? where id=?';
    db.query(sql,[req.body,req.auth.id],(err,results)=>{
        // 执行 SQL 语句失败
        if (err) return res.cc(err);

        // 执行 SQL 语句成功，但影响行数不为 1
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！');

        // 修改用户信息成功
        return res.cc('修改用户基本信息成功！', 0);
    });
}

// 更新密码
exports.updatePassword = (req,res)=>{

    // 判断密码是否跟数据库中相同
    const sql = 'select password from ev_users where id=?';
    db.query(sql,[req.auth.id],(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.length!=1){
            return res.cc("用户不存在，更新失败");
        }else{
            // 在头部区域导入 bcryptjs 后，
            // 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
            // compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
            const flag = bcryptjs.compareSync(req.body.oldPwd,results[0].password);
            // 判断提交的旧密码是否正确
            if(!flag){
                return res.cc("原密码错误");
            }else{
                const sql = 'update ev_users set password=? where id=?';
                req.body.newPwd = bcryptjs.hashSync(req.body.newPwd);
                db.query(sql,[req.body.newPwd,req.auth.id],(err,results)=>{
                    if(err){
                        return res.cc(err);
                    }
                    if(results.affectedRows!=1){
                        return res.cc("密码更新失败");
                    }else{
                        return res.cc("密码更新成功",0);
                    }
                });
            }
            

        }
    });

    

}

// 更新头像
exports.updateAvatar = (req,res)=>{
    const sql = 'update ev_users set user_pic=? where id=?';
    db.query(sql,[req.body.avatar,req.auth.id],(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.affectedRows!=1){
            return res.cc("头像更新失败");
        }else{
            return res.cc("头像更新成功",0);
        }
    });
}
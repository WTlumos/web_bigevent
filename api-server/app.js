// 导入express 模块
const express = require("express");
// 创建express 服务器实例
const app = express();

// 导入cors中间件
const cors = require("cors");
// 将cors注册为全局中间件
app.use(cors())

// 配置解析表单数据的中间件，只能解析 application/x-www-form-urlencoded格式的中间件
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'));

// 路由之前封装错误函数
app.use((req,res,next)=>{

    res.cc = (err,status = 1)=>{
        res.send({
            status,
            message: err instanceof Error? err.message: err
        })
    }
    next();
})

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require("express-jwt");

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT.expressjwt({
    secret:config.jwtSecretKey,
    algorithms: ["HS256"]
}).unless({path:[/^\/api\//] }));

// 导入并注册用户路由模块
const userRouter = require('./router/user');
const userInfoRouter = require('./router/userinfo');
// 导入并使用文章分类路由模块
const artCateRouter = require("./router/artcate");
// 导入并使用文章路由模块
const articleRouter = require("./router/article");
// 用于用户登录，注册
app.use('/api', userRouter);
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my',userInfoRouter);
// 为文章分类的路由挂载统一的访问前缀 /my/artcate
app.use('/my/article',artCateRouter);
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter);


const joi = require('joi')
// 错误中间件
app.use(function (err, req, res, next) {
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError'){ 
        return res.cc('身份认证失败！')
    }
    // 数据验证失败
    if (err instanceof joi.ValidationError){
        return res.cc(err)
    }
    // 未知错误
    res.cc(err)
})

// const https = require("https");
// const fs = require("fs");
// var option = {
//     key: fs.readFileSync('./ssl/xx.key'),
//     cert: fs.readFileSync('./ssl/xx.pem')
// }
// https.createServer(option,app).listen(3007,()=>{
//     console.log("api server running at post 3007");
// });

// 调用listen方法，指定端口号并启动web服务器
app.listen(3007,()=>{
    console.log("api server running at post 3007");
})
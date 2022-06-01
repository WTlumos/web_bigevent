// 导入express模块
const express= require("express");
// 导入路由
const router = express.Router();

// 导入处理函数
const articleHandler = require("../router_handler/article");

// 导入解析 formdata 格式表单数据的包
const multer = require('multer');
// 导入处理路径的核心模块
const path = require('path');

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const uploads = multer({dest:path.join(__dirname,'../uploads')});

// 导入验证
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema, get_article_schema,delete_article_schema,get_article_id_schema,update_article_schema } 
= require("../schema/article");

// 发布新文章的路由
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post("/add", uploads.single("cover_img"),expressJoi(add_article_schema),articleHandler.addArticle);

// 获取文章列表数据
router.get("/list",expressJoi(get_article_schema),articleHandler.getArticleList);

// 删除文章的路由
router.get("/delete/:id",expressJoi(delete_article_schema),articleHandler.deleteArticleById);

// 根据 id 获取文章的路由
router.get("/:id",expressJoi(get_article_id_schema),articleHandler.getArticleById);

// 根据 id 更新文章的路由
router.post("/edit",uploads.single("cover_img"),expressJoi(update_article_schema),articleHandler.updateArticleById);

module.exports=router;
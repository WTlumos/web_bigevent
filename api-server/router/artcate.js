// 导入express
const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入路由处理器
const artcateHandler = require("../router_handler/artcate");

// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
const { add_artcate_schema, 
    delete_artcate_schema,
    get_artcate_schema,
    update_artcate_schema } = require("../schema/artcate");

// 获取文章列表数据
router.get("/cates",artcateHandler.getArticleCates);

// 新增文章分类的路由
router.post("/addcates",expressJoi(add_artcate_schema), artcateHandler.addArticleCates);

// 删除文章分类的路由
router.get("/deletecate/:id",expressJoi(delete_artcate_schema),artcateHandler.deleteCateById);

// 查询文章分类的路由
router.get("/cates/:id",expressJoi(get_artcate_schema),artcateHandler.getCateById);

// 更新文章分类的路由
router.post("/updatecate",expressJoi(update_artcate_schema),artcateHandler.updateCateById);

// 向外共享路由对象
module.exports = router;
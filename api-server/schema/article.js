// 导入 joi 模块
const joi = require("joi");

// 定义 标题，分类id，内容，发布状态 的验证规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required();
const state = joi.string().valid("已发布","草稿").required();

// 定义id
const id = joi.number().integer().min(1).required();

// 验证规则对象 - 发布文章
exports.add_article_schema = {
    body:{
        title,
        cate_id,
        content,
        state
    }
};

// 验证规则对象 - 文章列表
exports.get_article_schema = {
    query:{
        // 页码值
        pagenum: joi.number().integer().min(1).required(),
        // 每页显示多少条数据
        pagesize: joi.number().integer().min(1).required(),
        // 文章分类的 Id
        cate_id: joi.number().integer().min(1),
        // 文章的状态，可选值有：已发布、草稿
        state: joi.string().valid("已发布","草稿")
    }
}

// 验证规则对象 - 删除文章
exports.delete_article_schema = {
    params:{
        id
    }
}

// 验证规则对象 - 根据id获取文章
exports.get_article_id_schema = {
    params:{
        id
    }
}

// 验证规则对象 - 更新文章
exports.update_article_schema = {
    body:{
        id,
        title,
        cate_id,
        content,
        state
    }
}
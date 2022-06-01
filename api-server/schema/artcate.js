// 导入定义验证规则的模块
const joi = require("joi");

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required();

// 校验规则对象 - 添加分类
exports.add_artcate_schema = {
    body:{
        name,
        alias
    }
}

// 校验规则对象 - 删除分类
exports.delete_artcate_schema={
    params:{
        id
    }
}

// 校验规则对象 - 查询分类
exports.get_artcate_schema={
    params:{
        id
    }
}

// 校验规则对象 - 更新分类
exports.update_artcate_schema={
    body:{
        id,
        name,
        alias
    }
}
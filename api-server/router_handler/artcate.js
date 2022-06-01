// 导入数据库操作模块
const db = require("../db/index");


// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req,res)=>{
    // res.send("ok");
    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据
    const sql = 'select * from ev_article_cate where is_delete = 0';
    db.query(sql,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.length<1){
            return res.cc("没有文章列表数据");
        }else{
            res.send({
                status: 0,
                message: "获取文章分类列表成功！",
                data: results
            })
        }
    })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req,res)=>{
    // res.send("add artcate");
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sql = "select * from ev_article_cate where name=? or alias=?";
    db.query(sql,[req.body.name,req.body.alias],(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.length==2){
            return res.cc("分类名称与别名被占用，请更换后重试！");
        }
        else if(results.length==1){
            if(results[0].name==req.body.name){
                return res.cc("分类名称被占用，请更换后重试！");
            }
            if(results[0].alias == req.body.alias){
                return res.cc("别名被占用，请更换后重试！");
            }
        }else{
            const sql = "insert into ev_article_cate set ?";
            db.query(sql,req.body,(err,results)=>{
                if(err){
                    return res.cc(err);
                }
                if(results.affectedRows!=1){
                    return res.cc("新增文章分类失败！");
                }else{
                    return res.cc("新增文章分类成功！",0);
                }
            })
        }
    })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req,res)=>{

    const sql = 'update ev_article_cate set is_delete=1 where id=?';
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        // SQL 语句执行成功，但是影响行数不等于 1
        if(results.affectedRows!=1){
            return res.cc("删除文章失败！");
        }else{
            return res.cc("删除文章成功！",0);
        }
    })
}

// 根据 Id 获取文章分类的处理函数
exports.getCateById=(req,res)=>{
    const sql = "select * from ev_article_cate where id=?";
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.length!=1){
            return res.cc("获取文章分类数据失败！");
        }
        else{
            return res.send({
                status: 0,
                message: '获取文章分类数据成功！',
                data: results[0]
            })
        }
    }) 
}

// 更新文章分类的处理函数
exports.updateCateById = (req,res)=>{
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    // id不等于当前id的行中进行查询
    const sql = 'select * from ev_article_cate where id<>? and (name=? or alias=?)';
    db.query(sql,[req.body.id, req.body.name, req.body.alias],(err,results)=>{
        if(err){
            return res.cc(err);
        }
        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length == 2){
             return res.cc('分类名称与别名被占用，请更换后重试！');
        }
        else if (results.length == 1){
            if(results[0].name == req.body.name){
                return res.cc('分类名称被占用，请更换后重试！');
            }
            if (results[0].alias == req.body.alias){
                 return res.cc('分类别名被占用，请更换后重试！');
            }
        }else{
            // TODO：更新文章分类
            // name和alias不应该和原来的一样
            const sql = 'select * from ev_article_cate where id=? and is_delete=0';
            db.query(sql,req.body.id,(err,results)=>{
                if(err){
                    return res.cc(err);
                }
                if(results.length!=1){
                    res.cc("该文章分类不存在");
                }
                else{
                    // 输入的数据是否和数据库中一致
                    if(results[0].name==req.body.name && results[0].alias==req.body.alias){
                        return res.cc("文章分类数据未更改，无须更新");
                    } 
                    else{
                        // 更新数据
                        const sql = 'update ev_article_cate set ? where id=?';
                        db.query(sql,[req.body,req.body.id],(err,results)=>{
                            if(err){
                                return res.cc(err);
                            }
                            if(results.affectedRows!=1){
                                return res.cc("更新文章分类失败！");
                            }else{
                                return res.cc("更新文章分类成功！",0);
                            }
                        })
                    }
                }
            })
            
        }

  
    })
}
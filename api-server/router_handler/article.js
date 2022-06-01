// 导入数据库
const db = require("../db/index");

// 导入处理路径的核心模块
const path = require('path');
// 导入时间模块
const moment = require("moment");

// 添加文章处理函数
exports.addArticle = (req,res)=>{
    /**
     * 文本类型的数据
     * [Object: null prototype] {
            title: 'test',
            cate_id: '3',
            content: 'test',
            state: '草稿'
        }
     */
    // console.log(req.body); 
    // console.log('--------分割线----------');
    /**
     * 文件类型的数据
     * {
            fieldname: 'cover_img',
            originalname: 'IMG_044531DF1EE9-1.jpeg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: 'xx/bigEvent/api-server/uploads',
            filename: '645fb12f08a5934cd16752d9fd73d4fa',
            path: 'xx/bigEvent/api-server/uploads/645fb12f08a5934cd16752d9fd73d4fa',
            size: 415527
        }
     */
    // console.log(req.file); 

    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img'){
        return res.cc("封面图片是必选项");
    }else{
        // res.send("add article");
        const sql = "select * from ev_articles where title = ?";
        db.query(sql,[req.body.title],(err,results)=>{
            if(err){
                return res.cc(err);
            }
            if(results.length>=1){
                return res.cc("文章名称被占用，请更换后重试！");
            }else{            
                const articleInfo = {
                    // 标题、内容、状态、所属的分类Id
                    ...req.body,
                    // 文章封面在服务器端的存放路径
                    cover_img: path.join('/uploads', req.file.filename),
                    // 文章发布时间
                    pub_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    // 文章作者的Id
                    author_id: req.auth.id
                }

                const sql = 'insert into ev_articles set ?';
                db.query(sql,articleInfo,(err,results)=>{
                    if(err){
                        return res.cc(err);
                    }
                    if(results.affectedRows!=1){
                        return res.cc("文章发布失败！");
                    }else{
                        return res.cc("文章发布成功！",0);
                    }
                })
            }
        });

    }

    
}

// 获取文章列表处理函数
exports.getArticleList = (req,res)=>{
    // console.log(req.query);
    const obj = req.query;
    // 页码值
    const pagenum = obj.pagenum;
    // 每页显示多少条数据
    const pagesize = obj.pagesize;
    const num = pagesize*(pagenum-1);

    var articleInfo = [num,pagesize];
    // 左外连接查询
    var sql = "select "+
                "a.id, title, pub_date, state, b.name as cate_name "+
                "from ev_articles as a "+
                "left outer join ev_article_cate as b "+
                "on a.cate_id = b.id "+
                "where a.is_delete=0 ";
    
    // 查询总数据
    var countsql = "select * from ev_articles where is_delete=0";
    if(obj.cate_id ){
        articleInfo.unshift(obj.cate_id);
        sql += " and a.cate_id=?";

        countsql+=" and cate_id=?";
    }
    if(obj.state && !obj.cate_id){
        articleInfo.unshift(obj.state);
        sql += " and a.state=?";

        countsql += " and state=?";
    }
    if(obj.state && obj.cate_id){
        articleInfo=[obj.cate_id,obj.state,num,pagesize];
        sql += " and a.state=?";

        countsql += " and state=?";
    }
    sql+="order by cast(pub_date as datetime) desc limit ?,?";
    // console.log(sql);
    // console.log(countsql);
    // console.log(articleInfo);
    // 查询数据库
    db.query(sql,articleInfo,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        // 查询总数据
        // 如果存在类别和文章状态
        articleInfo.pop();
        articleInfo.pop();
        // console.log(articleInfo);
        db.query(countsql,articleInfo,(err,result)=>{
            if(err){
                return res.cc(err);
            }
            res.send({
                    status: 0,
                    message: '获取文章列表成功！',
                    data: results,
                    total: result.length
            })
            
        });
        
    })

    // res.send("article list");
}

// 删除文章处理函数
exports.deleteArticleById = (req,res)=>{
    const sql = 'update ev_articles set is_delete=1 where id=?';
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.affectedRows!=1){
            return res.cc("文章删除失败！");
        }else{
            return res.cc("文章删除成功",0);
        }
    })
}

// 根据 id 获取文章的处理函数
exports.getArticleById = (req,res)=>{
    const sql = 'select * from ev_articles where is_delete=0 and id=?';
    db.query(sql,req.params.id,(err,results)=>{
        if(err){
            return res.cc(err);
        }
        if(results.length!=1){
            return res.cc("获取文章失败！");
        }else{
            return res.send({
                status: 0,
                message: "获取文章成功！",
                data: results[0]
            });
        }
    })
}

// 根据 id 更新文章的处理函数
exports.updateArticleById = (req,res)=>{
    if(!req.file || req.file.fieldname!='cover_img'){
        return res.cc("文章封面是必选参数！");
    }
    else{
        const sql = "select * from ev_articles where id<>? and title = ?";
        db.query(sql,[req.body.id,req.body.title],(err,results)=>{
            if(err){
                return res.cc(err);
            }
            if(results.length==1){
                return res.cc("文章名称被占用，请更换后重试！");
            }else{
                const articleInfo = {
                    // 标题、内容、状态、所属的分类Id
                    ...req.body,
                    // 文章封面在服务器端的存放路径
                    cover_img: path.join('/uploads', req.file.filename),
                    // 文章发布时间
                    pub_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    // 文章作者的Id
                    author_id: req.auth.id
                };
                const sql = "update ev_articles set ? where id = ?";
                db.query(sql, [articleInfo, req.body.id], (err, results) => {
                    // 执行 SQL 语句失败
                    if (err){
                         return res.cc(err);
                    }       
                    // SQL 语句执行成功，但是影响行数不等于 1
                    if (results.affectedRows != 1){
                        return res.cc('修改文章失败！');
                    }else{
                        // 更新文章分类成功
                        res.cc('修改文章成功！', 0)
                    }
                  
                   
                  })
            }
        })
    }
}
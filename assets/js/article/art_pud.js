initCate();
var layer = layui.layer;
var form = layui.form;

// 下拉文章分类列表
function initCate(){
    $.ajax({
        method: "GET",
        url: "/my/article/cates",
        success: function(res){
            const htmlStr = template("article_cates",res);
            $("[name=cate_id]").html(htmlStr);
            form.render();
        }
    })
}


// 初始化富文本编辑器
initEditor();


// 1. 初始化图片裁剪器
var img = $("#image");
var imgSrc = img.attr("src");

// 2. 裁剪选项
var options = {
    aspectRatio: 600 / 300,
    preview: '.img-preview'
}
// 3. 初始化裁剪区域
img.cropper(options);


// 上传文件
$("#btnFile").on("click",function(e){
    e.preventDefault();

    $("#file").click();
});

// 更换裁剪的图片
$("#file").on("change",function(e){
    var fileList = e.target.files;
    // console.log(fileList);
    if(fileList.length==0){
        return layer.msg("请上传文章封面！");
    }
    // 拿到用户选择的文件
    var file = fileList[0];
    // 根据选择的文件，创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(file);
    img
        // 销毁旧的裁剪区域
        .cropper('destroy') 
        // 重新设置图片路径     
        .attr('src', newImgURL)  
        // 重新初始化裁剪区域
        .cropper(options);       

});


// 文章状态保存
var articleState;
$(".btn-pub").on("click",function(e){
    articleState = "已发布";
})
$(".btn-draft").on("click",function(e){
    articleState = "草稿";
})

// 发布文章form
$(".layui-form").on("submit",function(e){
    // 1. 阻止表单的默认提交行为
    e.preventDefault();

    // 得到富文本内容
    var content = tinyMCE.editors["articleContent"].getContent();
    // console.log(content);
    // 富文本中没有内容
    if(content.length==0){
        return layer.msg('文章内容不能为空', {icon: 5});
    }
    // console.log(articleState);
    // 同步内容到textarea
    tinyMCE.editors["articleContent"].save();
    // console.log($("[name=content").val());
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var obj = new FormData($(this)[0]);
    // 3. 将文章的发布状态，存到 obj 中
    obj.append('state', articleState);
    // console.log(obj);
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    // 先判断图片是否上传过
    if(img.attr("src") == imgSrc){
        return layer.msg('请上传文章封面！', {icon: 5});
    }
    // 再输出为文件对象
    img.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 600,
            height: 300
    })
    .toBlob(function(blob) {
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // console.log(blob);
            // 5. 将文件对象，存储到 obj 中
            obj.append('cover_img', blob);
            // 6. 发起 ajax 数据请求
            if(flag){
                publishArticle(obj);
            }else{
                publishArticle(obj,id);
            }
    });
    
})

// 发布文章函数
function publishArticle(obj,id) {
    var url = 'add';
    if(!flag){
        obj.append("id",id);
        url = 'edit';
    }
    $.ajax({
        method: 'POST',
        url: '/my/article/'+url,
        data: obj,
        // 注意：如果向服务器提交的是 FormData 格式的数据，
        // 必须添加以下两个配置项
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status == 1) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 发布文章成功后，跳转到文章列表页面
            // 跳转至文章列表页
            var url = location.href;
            url = url.substring(0,url.lastIndexOf("/"));
            // console.log(url);
            location.href=url+'/art_list.html';
            // 点击左边框的文章列表按钮
            $("#artList",window.parent.document).click();
        }
    })
}

addOrUpdate(location.href);

// 判断为发布文章还是更新文章
var flag;
var id;
// 当链接中带有id时说明是更新
function addOrUpdate(url){
    // 路由中存在 /id/1
    var index = url.indexOf("?id=");
    if(index!=-1){
        // 更新
        flag = false;
        // console.log(url.substring(index+4));
        // 获取路由中的id值
        id = Number(url.substring(index+4));
        getArticle(id);
        // console.log($("[name=content]").val());
    }
    else{
        // 发布
        flag = true;
    }
}


// 根据id获取文章
function getArticle(id){
    $.ajax({
        method: "get",
        url: "/my/article/"+id,
        success: function(res){
            if(res.status==1){
                return layer.msg(res.message);
            }
            form.val("form-edit",res.data);
            img
                // 销毁旧的裁剪区域
                .cropper('destroy') 
                // 重新设置图片路径     
                .attr('src', "https://www.slikeglue.com:3007"+res.data.cover_img)  
                // 重新初始化裁剪区域
                .cropper(options);  
        }
    })
}
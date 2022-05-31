var layer = layui.layer;
// 获取用户信息
function getUserInfo(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers 就是请求头配置对象
        //  在baseAPI.js中采用统一为有权限的接口
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: (result)=>{
            // console.log(result);
            if(result.status==1){
                return layer.msg(result.message);
            }else{
                // TODO：获取头像信息
                renderAvatar(result.data);
            }   
        }
        
    })
}


getUserInfo();
// 获取头像信息 
function renderAvatar(user){
    // {"id": 4,"username": "admin","nickname": null, "email": null,"user_pic": null}
    // 用户头像
    const avatar = user.user_pic;
    // 用户姓名
    const name = user.nickname || user.username;
    if(avatar){
        // 渲染图片
        $(".text-avatar").hide().siblings("img").attr("src",avatar).show();
    }else{
        // 渲染文字
        // 只取姓名的第一个字符
        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).css("display","inline-block").siblings("img").hide();
    }
    $(".text-avatar").siblings("span").show().html("欢迎 "+name);
}

// 退出按钮
$("#btnLogout").on("click",function(){
    console.log($(this));
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, 
    function(index){
        //do something
        // 删除本地token
        localStorage.removeItem("token");

        // 跳转至登录页
        // 跳转至主页
        var url = location.href;
        url = url.substring(0,url.lastIndexOf("/"));
        location.href=url+"/login.html";

        layer.close(index);
    });
});


// 顶部个人中心下拉菜单
$("#top-user").on("click","dd",function(e){
    e.preventDefault();
    // console.log($("#nav-user dd").length);
    var dd = $("#nav-user dd").eq($(this).index());
    dd.children("a").children("i").click();
    dd.parent().parent().addClass("layui-nav-itemed")
    .siblings().removeClass("layui-nav-itemed");
});
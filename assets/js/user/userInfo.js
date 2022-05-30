var form = layui.form;

form.verify({
    nickname: function(value){
        if(value.length>6){
            return '昵称长度必须在 1 ~ 6 个字符之间！';
        }
    }
})
initUserInfo();
// 初始化用户信息
function initUserInfo(){
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: (result)=>{
            // console.log(result);
            if(result.status==1){
                return layer.msg(result.message);
            }else{
                // TODO：填充到表单中
                form.val('formUserInfo', result.data);
            }   
        }
        
    })
}

// 重置按钮
$("#btnReset").on("click",function(e){
    // 阻止表单的默认重置行为
    e.preventDefault();
    initUserInfo();

});



  // 监听表单的提交事件
$(".layui-form").on("submit",function(e){
    // 阻止表单的默认重置行为
    e.preventDefault();
    
    $.ajax({
        method: "POST",
        url: '/my/userinfo',
        data: {
            id: $(".layui-form [name=id]").val(),
            username: $(".layui-form [name=username]").val(),
            nickname: $(".layui-form [name=nickname]").val(),
            email: $(".layui-form [name=email]").val()
        },
        success: function(res){
            if(res.status==1){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            parent.window.getUserInfo();
        }
    });

});

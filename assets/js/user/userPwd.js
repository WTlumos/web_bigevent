var form = layui.form;
var layer = layui.layer;

// 表单验证规则
form.verify({
    pwd: [/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
    samePwd: function(val){
        if(val== $(".layui-form [name=oldPwd").val()){
            return '新旧密码不能相同！';
        }
    },
    rePwd: function(val){
        if(val!= $(".layui-form [name=newPwd").val()){
            return '两次密码不一致！';
        }
    }
})

// 提交密码
$(".layui-form").on("submit",function(e){
    e.preventDefault();

    $.ajax({
        method: "POST",
        url: "/my/updatepwd",
        data: {
            oldPwd: $(".layui-form [name=oldPwd").val(),
            newPwd: $(".layui-form [name=newPwd").val()
        },
        success: function(res){
            if(res.status==1){
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 重置表单
            $(".layui-form")[0].reset();
        }
    })
})
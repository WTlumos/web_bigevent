$(".login-box a").on("click",()=>{
    $(".login-box").hide();
    $(".reg-box").show();
})

$(".reg-box a").on("click",()=>{
    $(".reg-box").hide();
    $(".login-box").show();
})

// 获取form
const form = layui.form;
// console.log(form);
//  form.verify() 函数自定义校验规则
form.verify({
    pwd: [/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
    // value：表单的值
    repwd: function(value){
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        var pwd = $(".reg-box [name=password]").val();
        if (pwd !== value) {
            return '两次密码不一致！'
        }
    }
})

var layer = layui.layer;

// 监听注册表单的提交事件
$("#form-reg").on("submit",(e)=>{
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    const username = $("#form-reg [name=username]").val();
    // console.log(username);
    const password = $("#form-reg [name=password]").val();

    $.post("/api/register",{
        username:username,
        password:password
    },(result)=>{
        // console.log(result);
        if(result.status==1){
            return layer.msg(result.message);
        }else{
            layer.msg('注册成功，请登录！');
            // 模拟人的点击行为
            $(".reg-box a").click();
        }
    });
})

// 监听注册表单的登录事件
$("#form-login").on("submit",(e)=>{
    // 1. 阻止默认的提交行为
    e.preventDefault();
    // console.log($(this).serialize());
    // 2. 发起Ajax请求
    $.ajax({
        url: "/api/login",
        method: 'POST',
        // 快速获取表单中的数据
        data: {
            username:  $("#form-login [name=username]").val(),
            password:  $("#form-login [name=password]").val()
        },
        success: function(res) {
            if(res.status==1){
                return layer.msg(res.message);
            }
            layer.msg("登录成功！");
            // 存储token
            localStorage.setItem("token",res.token);
            // 跳转至主页
            var url = location.href;
            url = url.substring(0,url.lastIndexOf("/"));
            location.href=url+"/index.html";
        }
    })

});
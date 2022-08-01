// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //  统一为有权限的接口，设置 headers 请求头
    if(options.url.indexOf("/my")!=-1){
        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }
    }
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // console.log(options);
    options.url = 'https://www.slikeglue.com:8010'+options.url;

    // 全局统一挂载 complete 回调函数
    // 不论成功还是失败，最终都会调用 complete 回调函数
    options.complete = function(res){
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 可以使用 res.responseJSON 拿到服务器响应回来的数据
        const resJson = res.responseJSON;
        // console.log(resJson);
        if(resJson.status==1 && resJson.message=='身份认证失败！'){
            // layer.msg(resJson.message);
            // 清空token
            localStorage.removeItem("token");
            // 跳转至登录页
            var url = location.href;
            url = url.substring(0,url.lastIndexOf("/"));
            location.href=url+"/login.html";
        }
    }
    
})
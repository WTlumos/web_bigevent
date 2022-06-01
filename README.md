<!-- more -->
# 项目后台设计和实现

[api说明](/api.md)
[后台实现-node](/develop.md)

后台管理所有代码位于 `api-server` 文件夹中

# 项目前期的准备工作

## 初始化项目结构

1. 项目文件夹命名为 `code`，在该目录下新建 `login.html` 和 `index.html` 页面
2. 在 `code`目录下放入 `assets` 和`home`文件夹
3. 在 `assets` 中新建 `lib`文件，放入 `layui`和 `jquery`的开发包



## 使用GitHub管理大事件的项目

1. 在 `code` 目录中运行 `git init` 命令

2. 在 `code` 目录中运行 `git add .` 命令

3. 在 `code` 目录下运行 `git commit -m "init project"` 命令

4. 新建 Github 仓库 `web_bigevent`

5. 将本地仓库和Github仓库建立关联关系

   `git remote add origin https://[token]@github.com/[username]/web_bigevent.git`

6. 将本地仓库的代码推送到Github仓库中，运行`git push -u origin master` 命令

7. 运行 `git checkout -b login` 命令，创建并切换到 `login` 分支

8. 查看当前所处分支，运行 `git branch` 命令



## 安装插件

Express`v0.0.5`

Hosts current workspace with Express web server in Visual Studio Code

快捷键 `shift+command+p` 打开命令面板

选择 `express: Hosts Current Workspace and Open in Browser `



# 登录注册

## 绘制login页面的基本结构

样式来源 ：https://layuion.com/docs/

1. 编写 HTML 结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>大事件后台管理系统</title>
    <!-- 导入layui样式 -->
    <link rel="stylesheet" href="./assets/lib/layui/css/layui.css">
    <!-- 创建自定义样式 -->
    <link rel="stylesheet" href="./assets/css/login.css">
</head>
<body>
    <!-- 头部logo区域 -->
    <div class="layui-main">
        <!-- 背景图片 -->
        <img src="./assets/images/logo.png" alt="">
    </div>

    <!-- 登录注册区域 -->
    <div class="loginAndRegBox">
        <!-- 标题 -->
        <div class="title-box"></div>
        <!-- 登录页面 -->
        <div class="login-box"></div>
        <!-- 注册页面 -->
        <div class="reg-box"></div>
    </div>
</body>
</html>
```



2. 美化样式

```css
html,
body{
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: url(../images/login_bg.jpg) no-repeat center / cover;
}

.loginAndRegBox{
    width: 400px;
    height: 310px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
}

.title-box{
    width: 100%;
    height: 60px;
    background: url(../images/login_title.png) no-repeat center;
}
```



## 实现登录和注册的按需切换

1. 编写html结构

   ```html
   <!-- 登录注册区域 -->
   <div class="loginAndRegBox">
       <!-- 标题 -->
       <div class="title-box"></div>
       <!-- 登录页面 -->
       <div class="login-box">
           <a href="javascript:;">去注册</a>
       </div>
       <!-- 注册页面 -->
       <div class="reg-box">
           <a href="javascript:;">去登录</a>
       </div>
   </div>
   ```

2. 引入jquery

   ```html
   <script src="./assets/lib/jquery.js"></script>
   ```

3. 创建 `asset/js/login.js` ，并引入到 `login.html`

   ```js
   $(".login-box a").on("click",()=>{
       $(".login-box").hide();
       $(".reg-box").show();
   })
   
   $(".reg-box a").on("click",()=>{
       $(".reg-box").hide();
       $(".login-box").show();
   })
   ```



## 绘制登录表单的基本结构

```html
<!-- 登录页面 -->
<div class="login-box">
    <form class="layui-form" action="">
        <div class="layui-form-item">
          <input type="text" name="username" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-item">
            <input type="password" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-item">
            <button class="layui-btn layui-btn-normal layui-btn-fluid" lay-submit lay-filter="formDemo">登录</button>
        </div>
    </form>
    <a href="javascript:;">去注册</a>
</div>
```



## 美化登录表单的样式

```css
.login-box,
.reg-box{
    padding: 0 30px;
}

.login-box a,
.reg-box a{
    float: right;   
}

.reg-box{
    display: none;
}
```



## 绘制文本框前面的小图标

1. 在用户名的文本框之前，添加如下的标签结构：

   ```html
   <i class="layui-icon layui-icon-username"></i>
   ```

2. 在密码框之前，添加如下的标签结构：

   ```html
   <i class="layui-icon layui-icon-password"></i>
   ```

3. 美化样式：

   ```css
   .loginAndRegBox .layui-form-item{
       position: relative;
   }
   
   .loginAndRegBox .layui-form-item i{
       position: absolute;
       left: 10px;
       top: 50%;
       transform: translateY(-50%);
   }
   .loginAndRegBox .layui-form-item .layui-input{
       padding-left: 32px;
   }
   ```

   

## 快速绘制注册的表单

将登录的表单复制一份，并修改为注册的表单即可

```html
<!-- 注册页面 -->
<div class="reg-box">
    <form class="layui-form" action="">
        <div class="layui-form-item">
          <i class="layui-icon layui-icon-username"></i>
          <input type="text" name="username" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-item">
          	<i class="layui-icon layui-icon-password"></i>
            <input type="password" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-item">
          	<i class="layui-icon layui-icon-password"></i>
            <input type="password" name="password" required  lay-verify="required" placeholder="再次确认密码" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-item">
            <button class="layui-btn layui-btn-fluid layui-btn-normal" lay-submit lay-filter="formDemo">注册</button>
        </div>
    </form>
    <a href="javascript:;">去登录</a>
</div>
```



## 实现登录表单的验证

1. 导入 layui 的 js 文件

   ```html
   <!-- 导入layui.js -->
   <script src="./assets/lib/layui/layui.js"></script>
   ```

2. 为需要验证的表单项添加 `lay-verify` 属性，同时指定具体的校验规则即可

   https://layuion.com/docs/modules/form.html#verify

   

## 自定义校验规则

1. 从 layui 中获取 form 对象：

   ```js
   var form = layui.form
   ```

2. 通过 form.verify() 函数自定义校验规则：

   ```js
     form.verify({
       // 自定义了一个叫做 pwd 校验规则
       pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
       // 校验两次密码是否一致的规则
       repwd: function(value) {
         // 通过形参拿到的是确认密码框中的内容
         // 还需要拿到密码框中的内容
         // 然后进行一次等于的判断
         // 如果判断失败,则return一个提示消息即可
         var pwd = $('.reg-box [name=password]').val()
         if (pwd !== value) {
           return '两次密码不一致！'
         }
       }
     })
   ```

3. 按需为表单项添加校验规则：

   ```html
   <input type="password" name="password" required  lay-verify="required|pwd" placeholder="请输入密码" autocomplete="off" class="layui-input">
   
   
   <input type="password" name="repassword" required lay-verify="required|pwd|repwd" placeholder="再次确认密码" autocomplete="off" class="layui-input" />
   ```



## 发起注册用户的Ajax请求

1. 为注册表单添加Id：

   ```html
   <!-- 注册的表单 -->
   <form class="layui-form" id="form_reg"></form>
   ```

2. 监听提交事件：

   ```js
    var layer = layui.layer;
   // 监听注册表单的提交事件
   $("#form-reg").on("submit",(e)=>{
       // 1. 阻止默认的提交行为
       e.preventDefault()
       // 2. 发起Ajax的POST请求
       const username = $("#form-reg [name=username]").val();
       // console.log(username);
       const password = $("#form-reg [name=password]").val();
   
       $.post("http://127.0.0.1:3007/api/register",{
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
   ```



## 使用layer提示消息

1. 导入 layer：

   ```js
    var layer = layui.layer
   ```

2. 调用 `layer.msg()` 提示消息：

   ```js
    layer.msg('注册成功，请登录！')
   ```



##  发起登录的Ajax请求

1. 为登录表单添加id：

   ```html
   <form class="layui-form" id="form_login"></form>
   ```

2. 监听提交事件：

   ```js
   // 监听注册表单的登录事件
   $("#form-login").on("submit",(e)=>{
       // 1. 阻止默认的提交行为
       e.preventDefault();
       // console.log($(this).serialize());
       // 2. 发起Ajax请求
       $.ajax({
           url: "http://127.0.0.1:3007/api/login",
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
   ```



## 在ajaxPrefilter中统一拼接请求的根路径

1. 在 `/assets/js` 目录中新建 `baseAPI.js`

2. 编写如下代码：

   ```js
   // 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
   // 会先调用 ajaxPrefilter 这个函数
   // 在这个函数中，可以拿到我们给Ajax提供的配置对象
   $.ajaxPrefilter(function(options) {
     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
     options.url = 'http://ajax.frontend.itheima.net' + options.url
   })
   
   ```

3. 修改登录，注册中ajax提交的路由

   ```js
   // 监听注册表单的提交事件
   $.post("/api/register",...);
    
   // 监听登录表单的提交事件       
   $.post("/api/login",...);
   ```

   

## 提交login分支的代码到GitHub

1. 运行 `git add .` 命令
2. 运行 `git commit -m "完成了登录和注册的功能"` 命令
3. 运行 `git push -u origin login` 命令
4. 运行 `git checkout master` 命令
5. 运行 `git merge login` 命令
6. 运行 `git push` 命令
7. 运行 `git checkout -b index` 命令



# 后台主页

## 快速实现后台主页的布局效果

从 layUI 官方文档中粘贴布局的主要代码，并修改如下：

https://layuion.com/docs/element/layout.html#admin

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>大事件后台管理系统-首页</title>
    <!-- 导入layui样式 -->
    <link rel="stylesheet" href="./assets/lib/layui/css/layui.css">
</head>
<body>
    <div class="layui-layout layui-layout-admin">
        <div class="layui-header">
          <div class="layui-logo layui-hide-xs layui-bg-black">
              <img src="./assets/images/logo.png" alt="">
          </div>
          <!-- 头部区域（可配合layui 已有的水平导航） -->
          <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item layui-hide layui-show-md-inline-block">
              <a href="javascript:;">
                <img src="./assets/images/sample.jpg" class="layui-nav-img">
                个人中心
              </a>
              <dl class="layui-nav-child">
                <dd><a href="">基本资料</a></dd>
                <dd><a href="">更换头像</a></dd>
                <dd><a href="">重置密码</a></dd>
              </dl>
            </li>
            <li class="layui-nav-item" lay-header-event="menuRight" lay-unselect>
              <a href="javascript:;">退出 </a>
            </li>
          </ul>
        </div>
        
        <div class="layui-side layui-bg-black">
          <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree" lay-filter="test">
              <li class="layui-nav-item"><a href="javascript:;">首页</a></li>
              <li class="layui-nav-item">
                <a class="" href="javascript:;">文章管理</a>
                <dl class="layui-nav-child">
                  <dd><a href="javascript:;">文章类别</a></dd>
                  <dd><a href="javascript:;">文章列表</a></dd>
                  <dd><a href="javascript:;">发布文章</a></dd>
                </dl>
              </li>
              <li class="layui-nav-item">
                <a href="javascript:;">个人中心</a>
                <dl class="layui-nav-child">
                  <dd><a href="javascript:;">基本资料</a></dd>
                  <dd><a href="javascript:;">更换头像</a></dd>
                  <dd><a href="javascript:;">重置密码</a></dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="layui-body">
          <!-- 内容主体区域 -->
          <div style="padding: 15px;">内容主体区域。记得修改 layui.css 和 js 的路径</div>
        </div>
        
        <div class="layui-footer">
          <!-- 底部固定区域 -->
           © 大事件后台管理系统
        </div>
    </div>
    <!-- 导入layui.js -->
    <script src="./assets/lib/layui/layui.js"></script>
</body>
</html>
```



##  导入自定义样式

1. 导入css文件

   ```html
   <head>
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="./assets/css/index.css">
   </head>
   ```

2. 添加样式

   ```css
   .layui-footer{
       text-align: center;
   }
   ```



## 使用lay-shrink实现左侧菜单互斥效果

```html
<div class="layui-side layui-bg-black">
  <div class="layui-side-scroll">
    <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
    <ul class="layui-nav layui-nav-tree" lay-shrink="all">
      <!-- 省略其他代码 -->
    </ul>
  </div>
</div>
```



## 为菜单项添加图标

1. 导入第三方的图标库：

   ```html
   <!-- 导入第三方图标库 -->
   <link rel="stylesheet" href="/assets/fonts/iconfont.css" />
   ```

2. 修改左侧菜单的结构：

   ```html
   <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
   <ul class="layui-nav layui-nav-tree" lay-shrink="all" lay-filter="test">
       <li class="layui-nav-item layui-this">
           <!-- 
               href属性用来指定打开哪个网页
               target属性用来指定在哪里打开网页
               target=fm 表示在name为fm的iframe中打开指定网页
            -->
           <a href="./home/dashboard.html" target="fm">
               <span class="iconfont icon-home"></span>
               首页
           </a>
       </li>
     <li class="layui-nav-item">
       <a class="" href="javascript:;">
           <span class="iconfont icon-16"></span>文章管理
       </a>
       <dl class="layui-nav-child">
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-app"></i>
                   文章类别
               </a>
           </dd>
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-list"></i>
                   文章列表
               </a>
           </dd>
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-edit"></i>
                   发布文章
               </a>
           </dd>
       </dl>
     </li>
     <li class="layui-nav-item">
       <a href="javascript:;">
           <span class="iconfont icon-user"></span>个人中心
       </a>
       <dl class="layui-nav-child">
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-form"></i>
                   基本资料
               </a>
           </dd>
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-picture"></i>
                   更换头像
               </a>
           </dd>
           <dd>
               <a href="javascript:;">
                   <i class="layui-icon layui-icon-key"></i>
                   重置密码
               </a>
           </dd>
       </dl>
     </li>
   </ul>
   ```

3. 美化样式

   ```css
   .iconfont,
   .layui-nav-child .layui-icon{
       margin-right: 10px;
   }
   ```

   

## 使用iframe标签在内容主体区域显示网页内容

1. 在页面主体的 div 中添加 `iframe`：

   ```html
    <div class="layui-body">
       <!-- 内容主体区域 -->
       <iframe src="./home/dashboard.html" name="fm" frameborder="0"></iframe>
   </div>
   ```

2. 为`首页`链接添加`href`和`target`属性：

   ```html
   <li class="layui-nav-item layui-this">
       <!-- 
           href属性用来指定打开哪个网页
           target属性用来指定在哪里打开网页
           target=fm 表示在name为fm的iframe中打开指定网页
        -->
       <a href="./home/dashboard.html" target="fm">首页</a>
   </li>
   ```

3. 美化

   ```css
   iframe{
       width: 100%;
       height: 100%;
   }
   
   .layui-body{
       overflow: hidden;
   }
   ```

   

## 解决小问题

1. 为 `首页` 对应的导航 Item 项添加 `layui-this` 属性：

   ```html
   <li class="layui-nav-item layui-this">
     <a href="/home/dashboard.html" target="fm">
       <span class="iconfont icon-home"></span>首页</a>
   </li>
   ```

2. 强制清除 `<a>` 链接的 CSS3 动画：

   ```css
   a {
     transition: none !important;
   }
   ```



## 渲染图片头像和文字头像

1. 修改头部区域的的头像结构如下：

   ```html
   <a href="javascript:;" class="userinfo">
     <img src="./assets/images/sample.jpg" class="layui-nav-img">
     <span class="text-avatar">A</span>
     个人中心
   </a>
   ```

2. 在左侧导航区域的 `ul` 之前添加如下头像结构：

   ```html
   <div class="userinfo">
       <img src="./assets/images/sample.jpg" class="layui-nav-img">
       <span class="text-avatar">A</span>
       <span>欢迎 ***</span>
   </div>
   ```

3. 添加样式美化 UI 结构：

   ```css
   .text-avatar{
       display: inline-block;
       width: 30px;
       height: 30px;
       border-radius: 50%;
       background-color: rgb(65 151 136);
       font-size: 20px;
       text-align: center;
       line-height: 30px;
       margin-right: 10px;
       position: relative;
       top: 4px;
   }
   
   .userinfo{
       height: 60px;
       line-height: 60px;
       text-align: center;
   }
   .layui-side-scroll .userinfo{
       border-bottom: 1px solid #282b33;
   }
   
   .userinfo img,
   .userinfo span{
       display: none;
     	user-select: none;
   }
   ```

   

## 获取用户的基本信息

1. 导入需要的脚本：

   ```html
   <!-- 导入jquery -->
   <script src="./assets/lib/jquery.js"></script>
   <!-- 导入自己封装的 baseAPI -->
   <script src="./assets/js/baseAPI.js"></script>
   <!-- 导入自定义js -->
   <script src="./assets/js/index.js"></script>
   ```

2. 定义 getUserInfo 函数：

   ```js
   var layer = layui.layer;
   getUserInfo();
   
   function getUserInfo(){
       $.ajax({
           method: "GET",
           url: "/my/userinfo",
           // headers 就是请求头配置对象
           headers: {
               Authorization: localStorage.getItem("token") || ''
           },
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
   ```

   

## 渲染用户头像

定义 renderAvatar 函数

```js
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
```



## 统一为有权限的接口设置headers请求头

在 baseAPI的 `ajaxPrefilter` 中添加如下代码：

```js
//  统一为有权限的接口，设置 headers 请求头
if(options.url.indexOf("/my")!=-1){
    options.headers = {
        Authorization: localStorage.getItem("token") || ''
    }
}
```



## 实现退出功能

1. 修改退出的`<a>` 链接如下：

   ```html
   <a href="javascript:;" id="btnLogout">
     <span class="iconfont icon-tuichu"></span>
     退出
   </a>
   ```

2. 实现退出功能：

   采用layui的提示框

   https://layuion.com/docs/modules/layer.html#layer.confirm

   ```js
   // 退出按钮
   $("#btnLogout").on("click",()=>{
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
   ```



## 控制用户的访问权限

在调用有权限接口的时候，指定`complete`回调函数

jquery的ajax函数中请求成功会回调 `success`，失败会回调 `error`，但无论成功与否都会回调 `complete`

```js
// 不论成功还是失败，最终都会调用 complete 回调函数
complete: function(res){
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
```



## 优化权限控制的代码

将权限控制的代码，从每个请求中，抽离到 `ajaxPrefilter` 中：

```js
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
```



## 提交index分支的代码到GitHub

1. 运行 `git add .` 命令
2. 运行 `git commit -m "完成了主页功能的开发"` 命令
3. 运行 `git push -u origin index`命令
4. 运行 `git checkout master` 命令
5. 运行 `git merge index` 命令
6. 运行 `git push` 命令
7. 运行 `git checkout -b user` 命令



# 用户管理

## 基本资料

### 创建基本资料对应的页面

1. 在根目录下新建 `/user/user_info.html` 并初始化如下

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-基本资料</title>
       <!-- 导入layui样式 -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/user/userInfo.css">
   </head>
   <body>
       用户资料
   </body>
   </html>
   ```

2. 新建 `/assets/css/user/userInfo.css` 并初始化如下：

   ```css
   html,
   body{
       margin: 0;
       padding: 0;
   }
   
   body{
       background-color: #f2f3f5;
       padding: 15px;
   }
   ```

3. 修改 `index.html` 中 `基本资料` 对应 `<a>`

   ```html
   <a href="./user/userInfo.html" target="fm">
       <i class="layui-icon layui-icon-form"></i>
       基本资料
   </a>
   ```



### 绘制基本资料对应的表单

1. 编写如下的表单结构：

   采用layui的卡片面板绘制表单

   https://layuion.com/docs/element/panel.html#card

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-基本资料</title>
       <!-- 导入layui样式 -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/user/userInfo.css">
   </head>
   <body>
       <div class="layui-card">
           <div class="layui-card-header">修改用户信息</div>
           <div class="layui-card-body">
               <form class="layui-form" action="">
                   <div class="layui-form-item">
                       <label class="layui-form-label">登录名称</label>
                       <div class="layui-input-block">
                           <input type="text" name="username" required  lay-verify="required" placeholder="请输入登录名称" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">用户昵称</label>
                       <div class="layui-input-block">
                           <input type="text" name="nickname" required  lay-verify="required" placeholder="请输入用户昵称" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">用户邮箱</label>
                       <div class="layui-input-block">
                           <input type="text" name="email" required  lay-verify="required|email" placeholder="请输入用户邮箱" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <div class="layui-input-block">
                           <button class="layui-btn" lay-submit lay-filter="formDemo">提交修改</button>
                           <button type="reset" class="layui-btn layui-btn-primary">重置</button>
                       </div>
                   </div>
               </form>
           </div>
       </div>
   </body>
   </html>
   ```

   

2. 在页面底部导入如下的脚本：

   ```html
   <!-- 导入layui.js -->
   <script src="../assets/lib/layui/layui.js"></script>
   <!-- 导入jquery.js -->
   <script src="../assets/lib/jquery.js"></script>
   <!-- 导入自定义js -->
   <script src="../assets/js/user/userInfo.js"></script>
   ```

   

3. 在 `user_info.js` 中编写如下的代码：

   ```js
   var form = layui.form;
   
   form.verify({
       nickname: function(value){
           if(value.length>6){
               return '昵称长度必须在 1 ~ 6 个字符之间！';
           }
       }
   })
   ```

   

### 获取用户的基本信息

1. 导入 `baseAPI`：

   ```html
   <script src="/assets/js/baseAPI.js"></script>
   ```

2. 在 `user_info.js` 中定义并调用 `initUserInfo` 函数：

   ```js
   initUserInfo();
   // 初始化用户信息
   function initUserInfo(){
       $.ajax({
           method: "GET",
           url: "/my/userinfo",
           success: (result)=>{
               if(result.status==1){
                   return layer.msg(result.message);
               }else{
                   // TODO：填充到表单中
               }   
           }  
       })
   }
   ```

   

### 使用form.val方法快速为表单赋值

1. 为表单指定 `lay-filter` 属性：

   `form.val('filter', object);`用于给指定表单集合的元素赋值和取值

   https://layuion.com/docs/modules/form.html#val

   ```html
   <form class="layui-form" lay-filter="formUserInfo"></form>
   ```

2. 调用 `form.val()` 方法为表单赋值：

   ```js
   form.val('formUserInfo', res.data);
   ```

3. 使用隐藏域保存用户的 `id` 值：

   ```html
   <!-- form 表单区域 -->
   <form class="layui-form" lay-filter="formUserInfo">
     <!-- 这是隐藏域 -->
     <input type="hidden" name="id" value="" />
     
     <!-- 省略其他代码 -->
   </form>
   ```

   

### 实现表单的重置效果

阻止表单的默认重置行为，再重新获取用户信息即可

```js
// 重置按钮
$("#btnReset").on("click",function(e){
    // 阻止表单的默认重置行为
    e.preventDefault();
    initUserInfo();

});
```



### 发起请求更新用户的信息

阻止表单的默认提交行为，并发起数据请求

```js
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
```



## 重置密码

### 渲染重置密码的页面结构

1. 在 `/user/userPwd.html` 页面中编写如下的结构：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-重置密码</title>
       <!-- 导入layui样式 -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/user/userPwd.css">
   </head>
   <body>
       <div class="layui-card">
           <div class="layui-card-header">修改密码</div>
           <div class="layui-card-body">
               <form class="layui-form" action="" lay-filter="formUserInfo">
                   <!-- 隐藏用户id -->
                   <input type="hidden" name="id" value="">
                   <div class="layui-form-item">
                       <label class="layui-form-label">原密码</label>
                       <div class="layui-input-block">
                           <input type="password" name="oldPwd" required  lay-verify="required" placeholder="请输入原密码" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">新密码</label>
                       <div class="layui-input-block">
                           <input type="password" name="newPwd" required  lay-verify="required" placeholder="请输入新密码" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">确认密码</label>
                       <div class="layui-input-block">
                           <input type="password" name="rePwd" required  lay-verify="required" placeholder="请确认新密码" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <div class="layui-input-block">
                           <button class="layui-btn" lay-submit lay-filter="formDemo">修改密码</button>
                           <button type="reset" class="layui-btn layui-btn-primary" id="btnReset">重置</button>
                       </div>
                   </div>
               </form>
           </div>
       </div>
   
   </body>
   </html>
   ```

2. 在 `/assets/css/user/userPwd.css` 中编写如下的样式：

   ```css
   html,
   body{
       margin: 0;
       padding: 0;
       width: 100%;
   }
   
   body{
       padding: 15px;
       background-color: #f2f3f5;
   }
   
   .layui-card{
     width: 50%;
   }
   ```

   

### 为密码框定义校验规则

1. 在 body 结束标签之前导入如下的 `script` 标签：

   ```html
   <!-- 导入layui.js -->
   <script src="../assets/lib/layui/layui.js"></script>
   <!-- 导入jquery.js -->
   <script src="../assets/lib/jquery.js"></script>
   <!-- 导入baseAPI.js -->
   <script src="../assets/js/baseAPI.js"></script>
   <!-- 导入自定义js -->
   <script src="../assets/js/user/userInfo.js"></script>
   ```

   

2. 在 `userPwd.js` 中定义如下的三个校验规则

   ```js
   var form = layui.form;
   var layer = layui.layer;
   
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
   ```

   

3. 为密码框分别添加对应的校验规则

   ```html
   <form class="layui-form" action="" lay-filter="formUserInfo">
       <!-- 隐藏用户id -->
       <input type="hidden" name="id" value="">
       <div class="layui-form-item">
           <label class="layui-form-label">原密码</label>
           <div class="layui-input-block">
               <input type="password" name="oldPwd" required  lay-verify="required|pwd" placeholder="请输入原密码" autocomplete="off" class="layui-input">
           </div>
       </div>
       <div class="layui-form-item">
           <label class="layui-form-label">新密码</label>
           <div class="layui-input-block">
               <input type="password" name="newPwd" required  lay-verify="required|pwd|samePwd" placeholder="请输入新密码" autocomplete="off" class="layui-input">
           </div>
       </div>
       <div class="layui-form-item">
           <label class="layui-form-label">确认密码</label>
           <div class="layui-input-block">
               <input type="password" name="rePwd" required  lay-verify="required|pwd|rePwd" placeholder="请确认新密码" autocomplete="off" class="layui-input">
           </div>
       </div>
       <div class="layui-form-item">
           <div class="layui-input-block">
               <button class="layui-btn" lay-submit lay-filter="formDemo">修改密码</button>
               <button type="reset" class="layui-btn layui-btn-primary" id="btnReset">重置</button>
           </div>
       </div>
   </form>
   ```

   

### 发起请求实现重置密码的功能

```js
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
```



## 更换头像

### 初步渲染更换头像页面的结构

1. 创建 `/user/userAvatar.html` 页面：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-更换头像</title>
       <!-- 导入layui.css -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义css -->
       <link rel="stylesheet" href="../assets/css/user/userAvatar.css">
   </head>
   <body>
       <div class="layui-card">
           <div class="layui-card-header">更换头像</div>
           <div class="layui-card-body">
   
           </div>
       </div>
   </body>
   </html>
   ```

2. 在 `assets/css/user/userAvatar.css` 中美化基本样式：

   ```css
   html,
   body {
     margin: 0;
     padding: 0;
   }
   
   body {
     padding: 15px;
     background-color: #f2f3f5;
   }
   ```

   

3. 修改 `index.html` 中对应链接的属性：

   ```html
   <a href="./user/userAvatar.html" target="fm">
       <i class="layui-icon layui-icon-picture"></i>
       更换头像
   </a>
   ```



### cropper 基本用法

文档 https://github.com/fengyuanchen/jquery-cropper

官网 https://fengyuanchen.github.io/jquery-cropper/

1. 在 `<head>` 中导入 `cropper.css` 样式表：

   ```html
   <link rel="stylesheet" href="/assets/lib/cropper/cropper.css" />
   ```

2. 在 `<body>` 的结束标签之前，按顺序导入如下的 js 脚本：

   ```html
   <script src="/assets/lib/jquery.js"></script>
   <script src="/assets/lib/cropper/Cropper.js"></script>
   <script src="/assets/lib/cropper/jquery-cropper.js"></script>
   ```

3. 在卡片的 `layui-card-body` 主体区域中，定义如下的 HTML 结构：

   ```html
     <!-- 第一行的图片裁剪和预览区域 -->
     <div class="row1">
       <!-- 图片裁剪区域 -->
       <div class="cropper-box">
         <!-- 这个 img 标签很重要，将来会把它初始化为裁剪区域 -->
         <img id="image" src="/assets/images/sample.jpg" />
       </div>
       <!-- 图片的预览区域 -->
       <div class="preview-box">
         <div>
           <!-- 宽高为 100px 的预览区域 -->
           <div class="img-preview w100"></div>
           <p class="size">100 x 100</p>
         </div>
         <div>
           <!-- 宽高为 50px 的预览区域 -->
           <div class="img-preview w50"></div>
           <p class="size">50 x 50</p>
         </div>
       </div>
     </div>
   
     <!-- 第二行的按钮区域 -->
     <div class="row2">
       <button type="button" class="layui-btn">上传</button>
       <button type="button" class="layui-btn layui-btn-danger">确定</button>
     </div>
   ```

4. 美化的样式：

   ```css
   /* 设置卡片主体区域的宽度 */
   .layui-card {
       width: 50%;
   }
   
   .row1{
       overflow: hidden;
   }
   
   /* 设置裁剪区域的样式 */
   .cropper-box {
       float: left;
       width: 350px;
       height: 350px;
       background-color: cyan;
       overflow: hidden;
   }
   
   /* 设置 preview-box 区域的的样式 */
   .preview-box {
       float: left;
       margin-left: 10%;
       height: 350px;
   }
   
   /* 设置第一个预览区域的样式 */
   .w100 {
       width: 100px;
       height: 100px;
       background-color: gray;
   }
     
   /* 设置第二个预览区域的样式 */
   .w50 {
       width: 50px;
       height: 50px;
       background-color: gray;
       margin-top: 50px;
       margin-left: 25%;
   }
     
   /* 设置预览区域下方文本的样式 */
   .size {
       font-size: 12px;
       color: gray;
       text-align: center;
   }
   
     
   /* 设置 img-preview 区域的样式 */
   .img-preview {
       overflow: hidden;
       border-radius: 50%;
   }
   
     
   /* 设置按钮行的样式 */
   .row2 {
       margin-top: 20px;
       margin-left: 70%;
   }
   ```

   

5. 实现基本裁剪效果：

   ```js
   // 1.获取裁剪区域的 DOM 元素
   var img = $("#image");
   
   // 2.配置选项
   const options = {
       // 纵横比
       aspectRatio: 1,
       // 指定预览区域
       preview: '.img-preview'
   }
   
   // 3.创建裁剪区域
   img.cropper(options);
   ```

   

### 实现裁剪区域图片的替换

1. `userAvatar.html` 中添加上传文件的按钮

   ```html
   <!-- 第二行的按钮区域 -->
   <div class="row2">
       <input type="file" name="" id="file">
       <button type="button" class="layui-btn" id="btnFile">上传</button>
       <button type="button" class="layui-btn layui-btn-danger" id="btnUpload">确定</button>
   </div>
   ```

2. 隐藏按钮。在 `userAvatar.css` 中添加样式

   ```css
   #file{
     display: none;
   }
   ```

3. 上传按钮模拟点击文件上传。在 `userAvatar.js` 中添加

   ```js
   // 上传按钮
   $("#btnFile").on("click",function(e){
       e.preventDefault();
       // 模拟点击上传文件
       $("#file").click();
   
   });
   ```

4.  为文件选择框绑定 change 事件

   ```js
   $("#file").on("change",function(e){
       var filelist = e.target.files;
       // console.log(filelist);
       if(filelist.length==0){
           return layer.msg("请选择照片！");
       }
       // 1. 拿到用户选择的文件
       var file = filelist[0];
       // 2. 将文件，转化为路径
       var imgURL = URL.createObjectURL(file)
       // 3. 重新初始化裁剪区域
       img
       .cropper('destroy') // 销毁旧的裁剪区域
       .attr('src', imgURL) // 重新设置图片路径
       .cropper(options); // 重新初始化裁剪区域
   });
   ```

   

### 将裁剪后的头像上传到服务器

```js
// 确定按钮
$("#btnUpload").on("click",function(e){
    e.preventDefault();

    // 1. 要拿到用户裁剪之后的头像
    var dataURL = img
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      .toDataURL('image/png');
    // console.log(dataURL);

    // 2. 发起ajax请求
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            // 更新首页用户头像
            parent.window.getUserInfo();
      }
    })
})
```



### `base64`

https://www.css-js.com/tools/base64.html

**DataURI** 允许在HTML文档中嵌入小文件，可以使用 **img** 标签或 **CSS** 嵌入转换后的 **Base64** 编码，减少 **HTTP** 请求，加快小图像的加载时间。

经过**Base64** 编码后的文件体积一般比源文件大 **30%** 左右。



### 设置头部区域的快捷方式

打开 `index.html`，在头部 `个人中心` 中添加id属性如下

```html
<dl class="layui-nav-child" id="top-user">
  <dd><a href="javacript:;">基本资料</a></dd>
  <dd><a href="javacript:;">更换头像</a></dd>
  <dd><a href="javacript:;">重置密码</a></dd>
</dl>
```

对应的侧边栏用户管理，添加  `id="nav-user"`

```html
<li class="layui-nav-item">
  <a href="javascript:;">
      <span class="iconfont icon-user"></span>个人中心
  </a>
  <dl class="layui-nav-child" id="nav-user">
      <dd>
          <a href="./user/userInfo.html" target="fm">
              <i class="layui-icon layui-icon-form"></i>
              基本资料
          </a>
      </dd>
      <dd>
          <a href="./user/userAvatar.html" target="fm">
              <i class="layui-icon layui-icon-picture"></i>
              更换头像
          </a>
      </dd>
      <dd>
          <a href="./user/userPwd.html" target="fm">
              <i class="layui-icon layui-icon-key"></i>
              重置密码
          </a>
      </dd>
  </dl>
</li>
```



让头部个人中心点击事件直接触发侧边栏的点击事件

```js
// 顶部个人中心下拉菜单
$("#top-user").on("click","dd",function(e){
    e.preventDefault();
    // console.log($("#nav-user dd").length);
    var dd = $("#nav-user dd").eq($(this).index());
    dd.children("a").children("i").click();
    dd.parent().parent().addClass("layui-nav-itemed")
    .siblings().removeClass("layui-nav-itemed");
});
```



## 提交user分支的代码到GitHub

1. 运行 `git add .` 命令
2. 运行 `git commit -m "完成了用户管理功能的开发"` 命令
3. 运行 `git push -u origin user`命令
4. 运行 `git checkout master` 命令
5. 运行 `git merge user`命令
6. 运行 `git push` 命令
7. 运行 `git checkout -b article` 命令



# 文章管理

## 文章类别

### 创建并显示文章分类

1. 创建 `/article/art_cate.html` 页面，并初始化如下的UI结构：

   采用layui表格布局

   https://layuion.com/docs/element/table.html

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-文章分类</title>
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/article/art_cate.css">
   </head>
   <body>
           <div class="layui-card">
           <div class="layui-card-header">
               <span>文章类别管理</span>
               <button type="button" class="layui-btn layui-btn-normal">添加类别</button>
           </div>
           <div class="layui-card-body">
               <table class="layui-table">
                   <colgroup>
                       <!-- 定义列宽度，不加数字的为自适应 -->
                       <col>
                       <col>
                       <col width="200">
                   </colgroup>
                   <thead>
                     <tr>
                       <th>分类名称</th>
                       <th>分类别名</th>
                       <th>操作</th>
                     </tr> 
                   </thead>
                   <tbody>
                     <tr>
                       <td>贤心</td>
                       <td>2016-11-29</td>
                       <td>
                           <button class="layui-btn">编辑</button>
                           <button class="layui-btn layui-btn-danger">删除</button>
                       </td>
                     </tr>
                   </tbody>
               </table>
           </div>
       </div>
   </body>
   </html>
   ```

   

2. 定义 `/assets/css/article/art_cate.css` 美化样式：

   ```css
   html,
   body {
     margin: 0;
     padding: 0;
   }
   
   body {
     padding: 15px;
     background-color: #f2f3f5;
   }
   
   .layui-card-header span{
       float: left;
   }
   
   .layui-card-header button{
       float: right;
       margin-top: 10px;
   }
   ```

   

3. 修改 `index.html` 中对应的 `<a>` 链接：

   ```html
   <a href="./aticle/art_cate.html" target="fm">
       <i class="layui-icon layui-icon-app"></i>
       文章类别
   </a>
   ```



### 获取并使用模板引擎渲染表格的数据

1. 在 `/article/art_cate.html` 页面底部导入模板引擎：

   ```html
   <!-- 导入layui.js -->
   <script src="../assets/lib/layui/layui.js"></script>
   <!-- 导入jquery -->
   <script src="../assets/lib/jquery.js"></script>
   <!-- 导入自己封装的 baseAPI -->
   <script src="../assets/js/baseAPI.js"></script>
   <!-- 导入模板引擎 -->
   <script src="../assets/lib/template-web.js"></script>
   <!-- 导入自定义js -->
   <script src="../assets/js/article/art_cate.js"></script>
   ```

2. 在 `/article/art_cate.html` 页面中定义模板：

   ```html
   <!-- 表格数据的模板 -->
   <script type="text/html" id="cate_table">
     {{each data}}
     <tr>
         <td>{{$value.name}}</td>
         <td>{{$value.alias}}</td>
         <td>
             <button type="button" class="layui-btn layui-btn-xs">编辑</button>
             <button type="button" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>
         </td>
       </tr>
     {{/each}}
   </script>
   ```

   

3. 发起请求获取数据。在 `assets/js/article/art_cate.js` 中添加：

   ```js
   getAricleCate();
   
   function getAricleCate(){
   
       $.ajax({
           method: 'GET',
           url: '/my/article/cates',
           success: function(res) {
               // console.log(res);
               var htmlStr = template('cate_table', res)
               $('tbody').html(htmlStr);
         }
       })
   }
   ```

   

### 使用layer.open实现弹出层效果

layui的弹出层：https://layuion.com/docs/modules/layer.html

1. 在 `assets/js/article/art_cate.js` 中导入 `layer`：

   ```js
   var layer = layui.layer
   ```

2. 在 `/article/art_cate.html` 页面中为按钮添加 `id` 属性：

   ```html
   <button type="button" class="layui-btn layui-btn-normal layui-btn-sm" id="btnAddCate">添加类别</button>
   ```

3. 在按钮的点击事件中，通过 `layer.open()` 展示弹出层：

   ```js
   // 为添加类别按钮绑定点击事件
   $('#btnAddCate').on('click', function() {
     	layer.open({
           title: '在线调试'
           ,content: '配置各种参数，试试效果'
       });
   })
   ```



### 在弹出层中渲染form表单结构

1. 在页面中定义如下的 `script` 标签：

   ```html
   <!-- 添加类别表单 -->
   <script type="text/html" id="dialog-add">
       <form class="layui-form" id="form-add">
         <div class="layui-form-item">
           <label class="layui-form-label">分类名称</label>
           <div class="layui-input-block">
             <input type="text" name="name" required  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
           </div>
         </div>
         <div class="layui-form-item">
           <label class="layui-form-label">分类别名</label>
           <div class="layui-input-block">
             <input type="text" name="alias" required  lay-verify="required|alias" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
           </div>
         </div>
         <div class="layui-form-item">
           <div class="layui-input-block">
             <button class="layui-btn" lay-submit lay-filter="formDemo">确认添加</button>
             <button type="reset" class="layui-btn layui-btn-primary">重置</button>
           </div>
         </div>
       </form>
   </script>
   ```

   

2. 通过 `content` 属性指定内容：

   ```js
   // 添加类别按钮
   $("#btnAddCates").on("click",function(e){
       e.preventDefault();
   
       layer.open({
           // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
           type: 1,
           // area - 宽高
           area:['500px','250px'],
           title: '添加文章分类',
           // content不仅可以传入普通的html内容，还可以指定DOM
           content: $("#dialog-add").html()
       });
   })
   ```

   

3. 为别名定义校验规则：

   ```js
   // 文章分类规则
   var form = layui.form;
   form.verify({
       alias: [/^[a-zA-Z0-9]$/,"别名必须是字母或数字！"]
   });
   ```
   
   

### 实现添加文章分类的功能

1. 预先定义弹出层的索引

   ```js
   // 定义弹出层的索引
   var indexAdd = null;
   // 添加类别按钮
   $("#btnAddCates").on("click",function(e){
       e.preventDefault();
   
       indexAdd = layer.open({
           // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
           type: 1,
           // area - 宽高
           area:['500px','250px'],
           title: '添加文章分类',
           // content不仅可以传入普通的html内容，还可以指定DOM
           content: $("#dialog-add").html()
       });
   })
   ```

   

2. 发起ajax请求

   ```js
   // 通过代理的形式，为 form-add 表单绑定 submit 事件
   $("body").on("submit","#form-add",function(e){
       e.preventDefault();
   
       $.ajax({
           method: 'POST',
           url: '/my/article/addcates',
           data: {
               name: $("#form-add [name=name]").val(),
               alias: $("#form-add [name=alias]").val()
           },
           success: function(res) {
               if (res.status !== 0) {
                   return layer.msg(res.message);
               }
               // 刷新表格  
               getAricleCate();
               layer.msg(res.message);
               // 根据索引，关闭对应的弹出层
               layer.close(indexAdd);
           }
       });
   });
   ```



### 点击编辑按钮展示修改文章分类的弹出层

1. 为编辑按钮添加 `btn-edit` 类名如下：

   ```html
   <button type="button" class="layui-btn layui-btn-xs btn-edit">编辑</button>
   ```

2. 定义 `修改分类` 的弹出层：

   ```html
   <!-- 修改表单 -->
   <script type="text/html" id="dialog-edit">
       <form class="layui-form" id="form-edit" lay-filter="form-edit">
           <!-- 隐藏域，保存 id 的值 -->
           <input type="hidden" name="id">
           <div class="layui-form-item">
               <label class="layui-form-label">分类名称</label>
               <div class="layui-input-block">
               <input type="text" name="name" required  lay-verify="required" placeholder="请输入分类名称" autocomplete="off" class="layui-input">
               </div>
           </div>
           <div class="layui-form-item">
               <label class="layui-form-label">分类别名</label>
               <div class="layui-input-block">
               <input type="text" name="alias" required  lay-verify="required|alias" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
               </div>
           </div>
           <div class="layui-form-item">
               <div class="layui-input-block">
               <button class="layui-btn" lay-submit lay-filter="formDemo">确认修改</button>
               </div>
           </div>
       </form>
   </script>
   ```

   

3. 通过 `代理` 的形式，为 `btn-edit` 按钮绑定点击事件：

   ```js
   // 修改弹出层
   // 定义弹出层的索引
   var indexEdit= null;
   $("tbody").on("click",".btn-edit",function(e){
       e.preventDefault();
   
       indexEdit = layer.open({
           // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
           type: 1,
           // area - 宽高
           area:['500px','250px'],
           title: '修改文章分类',
           // content不仅可以传入普通的html内容，还可以指定DOM
           content: $("#dialog-edit").html()
       });
   })
   ```

   

### 为修改文章分类的弹出层填充表单数据

1. 为编辑按钮绑定 `data-id` 自定义属性：

   ```html
   <button type="button" class="layui-btn layui-btn-xs btn-edit" data-id="{{$value.id}}">编辑</button>
   ```

2. 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中：

   ```js
   // 修改弹出层
   // 定义弹出层的索引
   var indexEdit= null;
   $("tbody").on("click",".btn-edit",function(e){
       e.preventDefault();
   
       indexEdit = layer.open({
           // 0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
           type: 1,
           // area - 宽高
           area:['500px','250px'],
           title: '修改文章分类',
           // content不仅可以传入普通的html内容，还可以指定DOM
           content: $("#dialog-edit").html()
       });
   
       // 填充表单
       const id = $(this).data("id");
       // console.log(id);
       $.ajax({
           method: 'GET',
           url: '/my/article/cates/' + id,
           success: function(res) {
               // console.log(res);
               // 与form的lay-filter相联系
               form.val('form-edit', res.data);
           }
       })
   });
   ```

   

### 更新文章分类的数据

通过代理的形式，为修改分类的表单绑定 submit 事件

```js
// 通过代理的形式，为 form-edit 表单绑定 submit 事件
$("body").on("submit","#form-edit",function(e){
    e.preventDefault();

    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: {
            id: $("#form-edit [name=id]").val(),
            name: $("#form-edit [name=name]").val(),
            alias: $("#form-edit [name=alias]").val()
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 刷新表格  
            getAricleCate();
            layer.msg(res.message);
            // 根据索引，关闭对应的弹出层
            layer.close(indexEdit);
        }
    });
});
```



### 删除文章分类

1. 为删除按钮绑定 `btn-delete` 类名，并添加 `data-id` 自定义属性：

   ```html
   <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete" data-id="{{$value.id}}">删除</button>
   ```

2. 通过代理的形式，为删除按钮绑定点击事件：

   ```js
   // 删除按钮
   $("tbody").on("click",".btn-delete",function(e){
       e.preventDefault();
       // 填充表单
       const id = $(this).data("id");
   
       layer.confirm('确认删除?', { icon: 3, title: '提示' }, 
           function(index) {
               $.ajax({
                   method: 'GET',
                   url: '/my/article/deletecate/'+id,
                   success: function(res) {
                       if (res.status !== 0) {
                           return layer.msg(res.message);
                       }
                       // 刷新表格  
                       getAricleCate();
                       layer.msg(res.message);
                       // 根据索引，关闭对应的弹出层
                       layer.close(index);
                   }
               });
           });
   });
   ```

   

## 文章列表

### 创建文章列表页面

1. 新建 `/article/art_list.html` 页面结构如下：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-文章列表</title>
       <!-- layui样式 -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/article/art_list.css">
   </head>
   <body>
       <div class="layui-card">
           <div class="layui-card-header">
               文章列表
           </div>
           <div class="layui-card-body">
               <!-- 筛选区域 -->
               <!-- 列表区域 -->
               <table class="layui-table">
                   <colgroup>
                       <!-- 定义列宽度，不加数字的为自适应 -->
                       <col>
                       <col width="150" />
                       <col width="180" />
                       <col width="150" />
                       <col width="150" />
                   </colgroup>
                   <thead>
                     <tr>
                       <th>文章标题</th>
                       <th>分类</th>
                       <th>发表时间</th>
                       <th>状态</th>
                       <th>操作</th>
                     </tr>
                   </thead>
                   <tbody>
                       
                   </tbody>
               </table>
   
               <!-- 分页区域 -->
           </div>
       </div>
   
       <!-- 导入layui.js -->
       <script src="../assets/lib/layui/layui.js"></script>
       <!-- 导入jquery -->
       <script src="../assets/lib/jquery.js"></script>
       <!-- 导入自己封装的 baseAPI -->
       <script src="../assets/js/baseAPI.js"></script>
       <!-- 导入模板引擎 -->
       <script src="../assets/lib/template-web.js"></script>
       <!-- 导入自定义js -->
       <script src="../assets/js/article/art_list.js"></script>
   </body>
   </html>
   ```

   

2. 新建 `/assets/css/article/art_list.css` 样式表如下：

   ```css
   html,
   body {
     margin: 0;
     padding: 0;
   }
   
   body {
     padding: 15px;
     background-color: #f2f3f5;
   }
   ```

   

3. 新建 `/assets/js/article/art_list.js` 脚本文件

4. 修改 `index.html` 中对应的 `<a>` 链接：

   ```html
   <a href="./aticle/art_list.html" target="fm">
       <i class="layui-icon layui-icon-list"></i>
       文章列表
   </a>
   ```



### 定义查询参数对象

在 `/assets/js/article/art_list.js` 定义一个查询的参数对象如下：

```js
// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
var obj = {
    // 页码值，默认请求第一页的数据
    pagenum: 1, 
    // 每页显示几条数据，默认每页显示2条
    pagesize: 2
    // // 文章分类的 Id
    // ,cate_id: '', 
    // // 文章的发布状态
    // state: '' 
};
```



### 请求文章列表数据并使用模板引擎渲染列表结构

1.  `/assets/js/article/art_list.js`  中定义获取文章列表数据的方法如下：

   ```js
   initTable();
   var layer = layui.layer;
   function initTable(){
       $.ajax({
           method: 'GET',
           url: '/my/article/list',
           data: obj,
           success: function(res) {
             if (res.status !== 0) {
               return layer.msg(res.message);
             }
             if(res.data.length==0){
                   layer.msg("暂无数据");
               }
             // 使用模板引擎渲染页面的数据
             var htmlStr = template('article-table', res);
             $('tbody').html(htmlStr);
           }
       })
   }
   ```

   

2.  `/article/art_list.html`  定义列表数据的模板结构：

   ```html
   <script type="text/html" id="article-table">
       {{each data}}
       <tr>
           <td>{{$value.title}}</td>
           <td>{{$value.cate_name}}</td>
           <td>{{$value.pub_date}}</td>
           <td>{{$value.state}}</td>
           <td>
             <button type="button" class="layui-btn layui-btn-xs">编辑</button>
             <button type="button" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>
           </td>
       </tr>
       {{/each}}
   </script>
   ```

   

### 绘制筛选区域的UI结构

```html
<!-- 筛选区域 -->
<form class="layui-form" id="form-search">
    <div class="layui-form-item layui-inline">
      <select name="cate_id"></select>
    </div>
    <div class="layui-form-item layui-inline">
      <select name="state">
        <option value="">所有状态</option>
        <option value="已发布">已发布</option>
        <option value="草稿">草稿</option>
      </select>
    </div>
    <div class="layui-form-item layui-inline">
      <button class="layui-btn" lay-submit lay-filter="formDemo">筛选</button>
    </div>
</form>
```



### 发起请求获取并渲染文章分类的下拉选择框

1. 定义 `initCate` 函数请求文章分类的列表数据：

   ```js
   
   var form = layui.form;
   initCate();
   // 筛选区域 - 所有文章分类
   function initCate(){
       $.ajax({
           method: 'GET',
           url: '/my/article/cates',
           success: function(res) {
             if (res.status !== 0) {
               return layer.msg(res.message);
             }
           //   console.log(res);
             // 使用模板引擎渲染页面的数据
             var htmlStr = template('article-cate', res);
             $('.layui-form [name=cate_id]').html(htmlStr);
             // 通过 layui 重新渲染表单区域的UI结构
               form.render();
           }
       });
       
   }
   ```

   

2. 定义分类可选项的模板结构：

   ```html
   <!-- 文章分类模板 -->
   <script type="text/html" id="article-cate">
       <option value="">所有分类</option>
       {{each data}}
       <option value="{{$value.id}}">{{$value.name}}</option>
       {{/each}}
   </script>
   ```

   

### 实现筛选的功能

为筛选表单绑定 submit 事件

```js
// 筛选表单提交事件
$(".layui-form").on("submit",function(e){
    e.preventDefault();
    // 获取表单中选中项的值
    const id = $(".layui-form [name=cate_id]").val();
    const state = $(".layui-form [name=state]").val();
    // console.log(id,state);

    // 为查询参数对象 q 中对应的属性赋值
    if(id.length!=0){
        obj.cate_id = Number(id);
    }else{
        delete obj.cate_id;
    }
    if(state.length!=0){
        obj.state = state;
    }else{
        delete obj.state;
    }
    // console.log(obj);

    // 根据最新的筛选条件，重新渲染表格的数据
    initTable();
});
```



### 定义渲染分页的 renderPage 方法

1. 定义渲染分页的方法：

   ```js
   function renderPage(total) {
       console.log(total)
   }
   ```

2. 在 `initTable` 中调用 `renderPage` 方法：

   ```js
   function initTable(){
       $.ajax({
           method: 'GET',
           url: '/my/article/list',
           data: obj,
           success: function(res) {
               if (res.status !== 0) {
                   return layer.msg(res.message);
               }
                // 使用模板引擎渲染页面的数据
               var htmlStr = template('article-table', res);
               $('tbody').html(htmlStr);
   
               // 调用渲染分页的方法
               renderPage(res.total);  
           }
       })
   }
   ```

   

### 调用 laypage.render 方法渲染分页的基本结构

https://layuion.com/docs/modules/laypage.html

1. 在页面中定义分页的区域：

   ```html
   <!-- 分页区域 -->
   <div id="pageBox"></div>
   ```

2. 调用 laypage.render() 方法来渲染分页的结构：

   ```js
   // 分页函数
   function renderPage(total) {
       // console.log(total);
       var laypage = layui.laypage;
     
       //执行一个laypage实例
       laypage.render({
           //注意，这里的 test1 是 ID，不用加 # 号
           elem: 'pageBox', 
           //数据总数，从服务端得到
           count: total,
           // 每页显示几条数据
           limit: obj.pagesize, 
           // 设置默认被选中的分页 
           curr: obj.pagenum 
       });
   }
   ```

   

### 在jump回调函数中通过obj.curr获取到最新的页码值

```js
// 分页函数
function renderPage(total) {
    // console.log(total);
    var laypage = layui.laypage;
  
    //执行一个laypage实例
    laypage.render({
        //注意，这里的 test1 是 ID，不用加 # 号
        elem: 'pageBox', 
        //数据总数，从服务端得到
        count: total,
        // 每页显示几条数据
        limit: obj.pagesize, 
        // 设置默认被选中的分页 
        curr: obj.pagenum,
        // 分页发生切换的时候，触发 jump 回调
        // 触发 jump 回调的方式有两种：
        // 1. 点击页码的时候，会触发 jump 回调
        // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
        jump: function(ob,first) {
            // console.log(obj.curr);
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
            // 如果 first 的值为 true，证明是方式2触发的
            // 否则就是方式1触发的
            // console.log(first);
            // 把最新的页码值，赋值到 obj 这个查询参数对象中
            obj.pagenum = ob.curr;
            // console.log(obj);
            if(!first){
                initTable();
            }
        }   
    });
}
```



### 自定义分页的功能项

添加 `layout` 和 `limits` 属性

```js
// 分页函数
function renderPage(total) {
    // console.log(total);
    var laypage = layui.laypage;
  
    //执行一个laypage实例
    laypage.render({
        //注意，这里的 test1 是 ID，不用加 # 号
        elem: 'pageBox', 
        //数据总数，从服务端得到
        count: total,
        // 每页显示几条数据
        limit: obj.pagesize, 
        // 设置默认被选中的分页 
        curr: obj.pagenum,
        /**
         * 自定义排版。可选值有：
         * count（总条目输区域）、
         * prev（上一页区域）、
         * page（分页区域）、
         * next（下一页区域）、
         * limit（条目选项区域）、
         * refresh（页面刷新区域。注意：layui 2.3.0 新增） 、
         * skip（快捷跳页区域）
         */
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        //  每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框
        limits: [3,5,10],
        // 分页发生切换的时候，触发 jump 回调
        // 触发 jump 回调的方式有两种：
        // 1. 点击页码的时候，会触发 jump 回调
        // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
        jump: function(ob,first) {
            // console.log(obj.curr);
            // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
            // 如果 first 的值为 true，证明是方式2触发的
            // 否则就是方式1触发的
            // console.log(first);
            // 把最新的页码值，赋值到 obj 这个查询参数对象中
            obj.pagenum = ob.curr;
            // console.log(obj);
            if(!first){
                initTable();
            }
        }   
    });
}
```



### 删除文章

1. 为删除按钮绑定 `btn-delete` 类名和 `data-id` 自定义属性：

   ```html
   <button type="button" class="layui-btn layui-btn-danger layui-btn-xs btn-delete" data-id={{$value.id}}>删除</button>
   ```

2. 通过代理的形式，为删除按钮绑定点击事件处理函数：

   ```js
   // 删除按钮
   $("tbody").on("click",".btn-delete",function(e){
       e.preventDefault();
       
       // 获取删除按钮的个数
       var len = $('.btn-delete').length;
   
       const id = $(this).data("id");
   
       layer.confirm('确认删除?', { icon: 3, title: '提示' }, 
           function(index) {
               $.ajax({
                   method: 'GET',
                   url: '/my/article/delete/'+id,
                   success: function(res) {
                       if (res.status !== 0) {
                           return layer.msg(res.message);
                        }
                       layer.msg(res.message);
                       // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                       // 如果没有剩余的数据了,则让页码值 -1 之后,
                       // 再重新调用 initTable 方法
                       // 4
                       if (len == 1) {
                           // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                           // 页码值最小必须是 1
                           obj.pagenum = obj.pagenum === 1 ? 1 : obj.pagenum - 1
                       }
                       initTable();
                   }
               });
               layer.close(index);
           });
   
   });
   ```

   

## 发布文章

### 创建文章发布页面的基本结构

1. 新建 `/article/art_pub.html` 页面结构如下：

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>大事件后台管理系统-发布文章</title>
       <!-- layui样式 -->
       <link rel="stylesheet" href="../assets/lib/layui/css/layui.css">
       <!-- 导入自定义样式 -->
       <link rel="stylesheet" href="../assets/css/article/art_pub.css">
   </head>
   <body>
       <div class="layui-card">
           <div class="layui-card-header">
               发布文章
           </div>
           <div class="layui-card-body">
               <form class="layui-form" id="form-edit" lay-filter="form-edit">
                   <div class="layui-form-item">
                       <label class="layui-form-label">文章标题</label>
                       <div class="layui-input-block">
                       <input type="text" name="title" required  lay-verify="required" placeholder="请输入文章标题" autocomplete="off" class="layui-input">
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">文章类别</label>
                       <div class="layui-input-block" style="width:15%;">
                           <select name="cate_id" lay-verify="required"></select>
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <label class="layui-form-label">文章内容</label>
                       <!-- 为富文本编辑器外部的容器设置高度 -->
                       <div class="layui-input-block" style="height: 400px;">
                           <!-- 重要：将来这个 textarea 会被初始化为富文本编辑器 -->
                           <textarea name="content" id="articleContent"></textarea>
                       </div>
                   </div>
                   <div class="layui-form-item">
                       <div class="layui-input-block">
                           <button class="layui-btn" lay-submit>发布</button>
                           <button class="layui-btn layui-btn-primary" lay-submit>存为草稿</button>
                       </div>
                   </div>
               </form>
           </div>
       </div>
       <!-- 导入layui.js -->
       <script src="../assets/lib/layui/layui.js"></script>
       <!-- 导入jquery -->
       <script src="../assets/lib/jquery.js"></script>
       <!-- 导入自己封装的 baseAPI -->
       <script src="../assets/js/baseAPI.js"></script>
       <!-- 导入模板引擎 -->
       <script src="../assets/lib/template-web.js"></script>
       <!-- 导入自定义js -->
       <script src="../assets/js/article/art_pud.js"></script>
   </body>
   </html>
   ```

   

2. 新建 `/assets/css/article/art_pub.css` 样式文件如下：

   ```css
   html,
   body{
       margin: 0;
       padding: 0;
   }
   
   body{
       margin: 0 15px;
       background-color: #f2f3f5;
   }
   ```

   

3. 新建 `/assets/js/article/art_pub.js` 脚本文件

4. 修改 `index.html` 中对应的 `<a>` 链接：

   ```html
   <a href="./aticle/art_pub.html" target="fm">
       <i class="layui-icon layui-icon-edit"></i>
       发布文章
   </a>
   ```



### 渲染文章类别对应的下拉选择框结构

1. 在 `/article/art_pub.html`中 定义模板结构

   ```html
   <!-- 下拉选框 -->
   <script type="text/html" id="article_cates">
       <option value=""></option>
       {{each data}}
       <option value={{$value.id}}>{{$value.name}}</option>
       {{/each}}
   </script>
   ```

   

2. 在 `/assets/js/article/art_pub.js` 中定义 initCate 方法

   ```js
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
   ```

   

### 渲染富文本编辑器

TinyMCE是一款易用、且功能强大的所见即所得的富文本编辑器 http://tinymce.ax-z.cn/ 

1. 导入富文本必须的 `script` 脚本：

   ```html
   <!-- 富文本 -->
   <script src="../assets/lib/tinymce/tinymce.min.js"></script>
   <script src="../assets/lib/tinymce/tinymce_setup.js"></script>
   ```



2. 让TinyMCE关联页面的 `textarea`

   ```js
   function initEditor() {
     tinymce.init({
       //选择id为articleContent的标签作为编辑器
       selector: '#articleContent',
       // TODO: 其他事务
     })
   }
   ```

   

3. 在 `/assets/js/article/art_pub.js` 中调用 `initEditor()` 方法，初始化富文本编辑器：

   ```js
   initEditor();
   ```



### 渲染封面裁剪区域

1. 在 `<head>` 中导入 `cropper.css` 样式表：

   ```html
   <!-- 导入裁剪样式 -->
   <link rel="stylesheet" href="../assets/lib/cropper/cropper.css">
   ```

   

2. 在 `<body>` 的结束标签之前，按顺序导入如下的 js 脚本

   ```html
   <!-- 导入裁剪js -->
   <script src="../assets/lib/cropper/Cropper.js"></script>
   <script src="../assets/lib/cropper/jquery-cropper.js"></script>
   ```

   

3. 在表单中，添加如下的表单行结构：

   ```html
   <div class="layui-form-item">
       <label class="layui-form-label">文章封面</label>
       <div class="layui-input-block" id="img-box">
           <!-- 第一行的图片裁剪和预览区域 -->
           <div class="row1">
               <!-- 图片裁剪区域 -->
               <div class="cropper-box">
                   <!-- 这个 img 标签很重要，将来会把它初始化为裁剪区域 -->
                   <img id="image" src="../assets/images/sample.jpg" />
               </div>
               <!-- 图片的预览区域 -->
               <div class="preview-box">
                   <div>
                       <!-- 宽高为 200px 的预览区域 -->
                       <div class="img-preview w200"></div>
                       <p class="size">200 x 100</p>
                   </div>
               </div>
           </div>
   
           <!-- 第二行的按钮区域 -->
           <div class="row2">
             	<!-- 选择封面按钮 -->
               <button type="button" class="layui-btn layui-btn-danger" id="btnFile">选择封面</button>
           </div>
       </div>
   </div>
   ```

   

4. 美化的样式：

   ```css
   /* 设置裁剪区域的样式 */
   .cropper-box {
       float: left;
       width: 600px;
       height: 300px;
       background-color: cyan;
       overflow: hidden;
   }
   
   /* 设置 preview-box 区域的的样式 */
   .preview-box {
       float: right;
   }
   
   /* 设置第一个预览区域的样式 */
   .w200 {
       width: 200px;
       height: 100px;
       background-color: gray;
   }
   
   /* 设置预览区域下方文本的样式 */
   .size {
       font-size: 12px;
       color: gray;
       text-align: center;
   }
   
     
   /* 设置 img-preview 区域的样式 */
   .img-preview {
       overflow: hidden;
   }
   
     
   /* 设置按钮行的样式 */
   .row2 {
       position: absolute;
       bottom: 0;
       right: 0;
   }
   
   /* 上传文件按钮 */
   #file{
       display: none;
   }
   
   /* 裁剪图片div */
   #img-box{
       width: 70%;
       position: relative;
       margin-bottom: 20px;
   }
   ```

   

5. 在 `/assets/js/article/art_pub.js` 中实现基本裁剪效果：

   ```js
   // 1. 初始化图片裁剪器
   var img = $("#image");
   // 2. 裁剪选项
   var options = {
       aspectRatio: 600 / 300,
       preview: '.img-preview'
   }
   // 3. 初始化裁剪区域
   img.cropper(options);
   ```



### 点击选择封面按钮打开文件选择框

1. 修改 UI 结构，为 `选择封面` 按钮添加 `id`，并且在按钮后面添加 `文件选择框`：

   ```html
   <!-- 第二行的按钮区域 -->
   <div class="row2">
     	<!-- 隐藏的文件选择框 -->
       <input type="file" name="" id="file" accept="image/png,image/jpeg,image/gif">
     	<!-- 选择封面按钮 -->
       <button type="button" class="layui-btn layui-btn-danger" id="btnFile">选择封面</button>
   </div>
   ```

   

2. 为选择封面的按钮，绑定点击事件处理函数：

   ```js
   $("#btnFile").on("click",function(e){
       e.preventDefault();
   
       $("#file").click();
   })
   ```

   

### 将选择的图片设置到裁剪区域中

监听 `file` 的 `change` 事件，获取用户选择的文件列表：

```js
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
```



### 分析发布文章的实现步骤

1. 为 `存为草稿` 和 `发布` 按钮添加 `id` 属性：

   ```html
   <button class="layui-btn btn-pub" lay-submit>发布</button>
   <button class="layui-btn layui-btn-primary btn-draft" lay-submit>存为草稿</button>
   ```

   

2. 确定文章的发布状态：

   ```js
   // 文章状态保存
   var articleState;
   $(".btn-pub").on("click",function(e){
       articleState = "已发布";
   })
   $(".btn-draft").on("click",function(e){
       articleState = "草稿";
   })
   ```



### 基于Form表单创建FormData对象

当文章内容无输入时，应该有判断

```js
// 得到富文本内容
var content = tinyMCE.editors["articleContent"].getContent();
// console.log(content);
// 富文本中没有内容
if(content.length==0){
    return layer.msg('文章内容不能为空', {icon: 5});
}
```



富文本中的数据同步到textarea

http://tinymce.ax-z.cn/advanced/some-example.php

```js
tinyMCE.editors["articleContent"].save();
```



为表单绑定 submit 提交事件

```js
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
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var obj = new FormData($(this)[0]);
    // 3. 将文章的发布状态，存到 obj 中
    obj.append('state', articleState);
    // console.log(obj);
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    // 先判断图片是否上传过
    if(img.attr("src") == "../assets/images/sample.jpg"){
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
            publishArticle(obj);
      });
    
})
```



### 发起Ajax请求实现发布文章的功能

1. 定义一个发布文章的方法：

   ```js
   function publishArticle(obj) {
       $.ajax({
           method: 'POST',
           url: '/my/article/add',
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
   ```

2. 其中的 `$("#artList")` 是侧边栏的文章列表的id

   在 `index.html` 中为文章列表添加 id

   ```html
   <a href="./aticle/art_list.html" target="fm">
       <i class="layui-icon layui-icon-list" id="artList"></i>
       文章列表
   </a>
   ```

   

### 编辑文章

1. 定义  `getArticle` 函数，获取文章 `art_pub.js`

   ```js
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
                   .attr('src', "http://127.0.0.1:3007"+res.data.cover_img)  
                   // 重新初始化裁剪区域
                   .cropper(options);  
           }
       })
   }
   ```

2. 通过路由判断页面采用发布还是更新 `art_pub.js`

   ```js
   addOrUpdate(location.href);
   
   // 判断为发布文章还是更新文章
   var flag;
   var id;
   // 当链接中带有id时说明是更新
   function addOrUpdate(url){
       // 路由中存在 ?id=1
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
   ```

3. 修改表单的ajax请求，融合发布和更新 `art_pub.js`

   ```js
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
   ```

4. 修改`art_list.html` 中的编辑按钮

   ```html
   <button type="button" class="layui-btn layui-btn-xs btn-edit" data-id={{$value.id}}>编辑</button>
   ```

5. 添加编辑按钮点击事件 `art_list.js`

   ```js
   // 编辑按钮
   $("tbody").on("click",".btn-edit",function(e){
       e.preventDefault();
   
       // 跳转至文章编辑页
       var url = location.href;
       url = url.substring(0,url.lastIndexOf("/"));
       // console.log(url);
       location.href=url+'/art_pub.html?id='+$(this).data("id");
       // 点击左边框的发布文章按钮
       $("#artPub",window.parent.document).parent().parent().addClass("layui-this");
       $("#artPub",window.parent.document).parent().parent().siblings().removeClass("layui-this");
   });
   ```

6. 最后两行对应 `index.html` 中的 `发布文章` 和 `文章列表`

   ```html
   <dd>                     
   		<a href="./aticle/art_list.html" target="fm" >
           <i class="layui-icon layui-icon-list" id="artList"></i>
           文章列表
       </a>
   </dd>
   <dd >
       <a href="./aticle/art_pub.html" target="fm">
           <i class="layui-icon layui-icon-edit" id="artPub"></i>
           发布文章
       </a>
   </dd>
   ```

   

### 将开发完成的项目代码推送到GitHub

1. 运行 `git add .` 命令
2. 运行 `git commit -m "完成了文章功能的开发"` 命令
3. 运行 `git push -u origin article命令
4. 运行 `git checkout master` 命令
5. 运行 `git merge article`命令
6. 运行 `git push` 命令












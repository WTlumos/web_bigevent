// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
var obj = {
    // 页码值，默认请求第一页的数据
    pagenum: 1, 
    // 每页显示几条数据，默认每页显示2条
    pagesize: 3
    // // 文章分类的 Id
    // ,cate_id: '', 
    // // 文章的发布状态
    // state: '' 
};

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
            
            // 调用渲染分页的方法
            renderPage(res.total);  
        }
    })
}

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
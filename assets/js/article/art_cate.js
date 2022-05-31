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

var layer = layui.layer;

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

var form = layui.form;
// 文章分类规则
form.verify({
    alias: [/^[a-zA-Z0-9]{1,}$/,"别名必须是字母或数字！"]
});

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
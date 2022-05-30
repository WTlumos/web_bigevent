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

// 上传按钮
$("#btnFile").on("click",function(e){
    e.preventDefault();
    // 模拟点击上传文件
    $("#file").click();

});

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
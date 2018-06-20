//进度条功能
//禁用进度环
NProgress.configure({showSpinner: false});

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function(){
  //开启进度条
  NProgress.start();
});

$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },500)
})


//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf('login.html') == -1){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    success:function(info){
      //console.log(info);
      if(info.error == 400){
        location.href = "login.html";
      }
    }
  })
}

//给菜单按钮注注册点击事件
$('.icon_menu').on('click',function(){

    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
})

//退出按钮的事件 模态框出现 按确定按钮 发送ajax请求 请求后台删除数据 并且下次进入页面应该跳转登录按钮

$('.icon_logout').on('click',function(){
  $('#logoutModal').modal('show');

  //off:解绑所有的事件

  $('.btn_logout').on('click',function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  });
});















//分类管理展开效果
$('.child').prev().on('click',function(){
  
  $(this).next().slideToggle();


})
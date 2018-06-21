


//初始化左边的区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//初始化右边的区域滚动
mui('.category_right .mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//渲染左边的数据 发送请求
$.ajax({
  type: 'get',
  url: '/category/queryTopCategory',
  success: function (info) {
    console.log(info);
    $('.category_left ul').html(template('firsttpl', info));


    //打开页面 渲染右边的数据 默认渲染有now类的那组数据
    renderSecond(info.rows[0].id)
  }
})

  //渲染右边的数据 设置一个形参 可以设置先渲染哪组数据
  function renderSecond(id) {
    $.ajax({
      typr: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id,
      },
      success: function (info) {
        console.log(info);
        $('.category_right ul').html(template('secondtpl', info))
      }
    })
  }

  //给动态生成的a注册委托事件 点击的时候渲染对应的数据
  $('.category_left').on('click', 'li', function () {
    //排他 让点击的a有now的类 其他的没有这个类
    $(this).addClass('now').siblings().removeClass('now');
    //获取当前a的id
    var id = $(this).data('id');
    //id传到封装的ajax函数中  渲染对应的那组数据
    renderSecond(id);

})


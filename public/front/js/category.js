



mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

mui('.category_right .mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


$.ajax({
  type: 'get',
  url: '/category/queryTopCategory',
  success: function (info) {
    console.log(info);
    $('.category_left ul').html(template('firsttpl', info))
    renderSecond(info.rows[0].id)
  }
})


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


  $('.category_left').on('click', 'li', function () {
    $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data('id');
    renderSecond(id);

})


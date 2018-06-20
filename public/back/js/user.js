$(function(){

  //功能一 把数据渲染到页面上
  var page = 1;
  var pageSize = 8;
  render();
  function render(){
      $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
          page:page,
          pageSzie:pageSize,
        },
        success:function(info){
          //console.log(info);
          $('tbody').html( template('tpl',info)); 

          //分页功能
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage: page,
            totalPages:Math.ceil( info.total / info.size),
            size:'small',
            onPageClicked:function(a,b,c,p){
              page = p;
              render();
            }
          })
        }
      })
  }

  //切换状态 发送请求
  $('tbody').on('click','.btn',function(){

    $('#userModal').modal('show');
    var id = $(this).parent().data('id');
    //取决于点的是启用按钮还是禁用按钮
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0 ;

    $('.btn_sure').off().on('click',function(){

      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete,
        },
        success:function(info){
          //console.log(info);
          if(info.success){
            render();
            $('#userModal').modal('hide');
          }
        }
      })

    })
  });





})
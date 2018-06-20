$(function () {

  var page = 1;
  var pageSize = 8;
  render();
  function render() {
    $.ajax({
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize,
      },
      url: '/category/queryTopCategoryPaging',
      success: function (info) {

        console.log(info);
        $('tbody').html(template('tpl', info));

        //分页功能
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: 1,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        })
      }
    })
  }



  //增加分类按钮注册事件 显示模态框
  $('.btn_add').on('click', function () {

    $('#addModal').modal('show');
  });




  //校验表单
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空",
          }
        }
      }
    }

  })

  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //隐藏模态框
          $('#addModal').modal('hide');
          //重新渲染
          page = 1;
          render();
          //初始化表单
          $('form').data('bootstrapValidator').resetForm();
        }
      }
    })
  });







})
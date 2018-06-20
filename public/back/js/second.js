$(function() {


  //发送ajax请求
  var page = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        //console.log(info);
          $('tbody').html(template('tpl',info));

          //分页功能
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:page,
            totalPages: Math.ceil(info.total/info.size),
            size:'small',
            onPageClicked:function(a,b,c,p){
              page = p;
              render();
            }
          })
      }
    })
  }


  //给增加分类的按钮注册点击事件 让模态框显示
  $('.btn_add').on('click',function(){
    $('#addModal').modal('show');
  //下拉框的功能
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page:1,
      pageSize:100,//请求到所有的数据
    },
    success:function(info) {
      console.log(info);
      $('.dropdown-menu').html(template('tpl2',info));
    }
  })
  });

  //给下拉框中的a注册委托事件 获取a的内容和id 给到button
  $('.dropdown-menu').on('click','a',function(){

    $('.dropdown-text').text( $(this).text());
    //获取到当前a的id值，设置给categoryId
    $("[name='categoryId']").val($(this).data("id"));

    //3.让categoryId校验变成成功
    $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

    //初始化图片上传
    $("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data);
        //data.result.picAddr可以拿到图片的地址
        $('.img_box img').attr('src',data.result.picAddr);

         //把图片的地址赋值给brandLogo
        $('[name="brandLogo"]').val(data.result.picAddr);

         //把brandLogo改成成功
      $('form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    });

    //表单校验
    $('form').bootstrapValidator({
      excluded:[],
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryId:{
          validators:{
            notEmpty:{
              message:'请选择一级名称',
            }
          }
        },
        brandName:{
          validators:{
            notEmpty:{
              message:'请选择二级名称'
            }
          }
        },
        brandLogo:{
          validators:{
            notEmpty:{
              message:'请上传图片'
            }
          }
        }
      }
    })


     //给表单注册校验成功事件
     $('form').on('success.form.bv',function(e){

      e.preventDefault();
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$('form').serialize(),
        success:function(info) {
         // console.log(info);

          $('#addModal').modal('hide');
          currentPage = 1;
          render();

            //3. 重置内容和样式
            $('form')[0].reset();
            $('form').data('bootstrapValidator').resetForm();

             //4. 重置下拉框组件和图片
             $('.dropdown-text').text('请输入一级分类的名称');
             $("[name='categoryId']").val('');
             $('.img_box img').attr('src','images/none.png');
             $('[name = "brandLogo"]').val('');

        }
      })
     })





 





})
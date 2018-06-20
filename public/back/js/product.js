
$(function() {


  //渲染页面
  var  page = 1;
  var pageSize = 5;
  var imgs = [];
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info) {
        console.log(info);
        $('tbody').html(template('tpl',info));

        //分页功能
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage : page,
          totalPages:Math.ceil(info.total/info.size),
          size:'small',
           //这个函数的返回值就是按钮的显示的内容
           itemTexts: function (type, page) {
            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          tooltipTitles: function (type, page) {
            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },
          useBootstrapTooltip: true,
          bootstrapTooltipOptions: {
            placement: 'bottom'
          },
          onPageClicked:function(a,b,c,p) {
            page = p;
            render();
          }

        })
      }
    })
  }

  //点击添加商品显示模态框
  $('.btn_add').on('click',function(){
    $('#addModal').modal('show');

    //动态渲染二级分类的名称
    render();
    function render(){
      $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
          page:1,
          pageSize:100,
        },
        success:function(info) {
          console.log(info);
          $('.dropdown-menu').html(template('tpl2',info));
        }
      })
    }
  })
  //给二级分类的a注册点击事件
  $('.dropdown-menu').on('click','a',function() {
    $('.dropdown-text').text($(this).text());
    $('[name="brandId"]').val($(this).data('id'));
    $('form').data('bootstrapValidator').updateStatus('brandId',"VALID");
  })

  //上传图片
  $('#fileupload').fileupload({

   
    done:function(e,data){

      if(imgs.length > 3){
        return;
      }
      console.log(data);
      $('.img_box').append('<img src="'+data.result.picAddr+'" alt="" width="100" height="100">');
      imgs.push(data.result);
      console.log(imgs);
      if(imgs.length === 3){
        $('form').data('bootstrapValidator').updateStatus('tips','VALID');
      }else{
        $('form').data('bootstrapValidator').updateStatus('tips','INVALID');
      }
    }
  })

  //校验表单
  $('form').bootstrapValidator({
    excluded:[],
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
    brandId:{
      validators:{
        notEmpty:{
          message:'请选择分类名'
        }
      }
    },
    proName:{
      validators:{
        notEmpty:{
          message:'请输入商品名称'
        }
      }
    },
    proDesc:{
      validators:{
        notEmpty:{
          message:'请输入商品描述'
        }
      }
    },
    num:{
      validators:{
        notEmpty:{
          message:'请输入商品库存'
        }
      }
    },
    size:{
      validators:{
        notEmpty:{
          message:'请输入商品尺寸'
        }
      }
    },
    oldPrice:{
      validators:{
        notEmpty:{
          message:'请输入商品原价'
        }
      }
    },
    price:{
      validators:{
        notEmpty:{
          message:'请输入商品现价'
        }
      }
    },
    tips:{
      validators:{
        notEmpty:{
          message:'请上传三张图片'
        }
      }
    }
  }

  })
  //表单验证成功事件
  $('form').on('success.form.bv',function(e) {
    e.preventDefault();

    var parm = $('form').serialize();
    
    parm+="&picName1"+imgs[0].picName+"&picAddr1"+imgs[0].picAddr;
    parm+="&picName2"+imgs[1].picName+"&picAddr2"+imgs[1].picAddr;
    parm+="&picName3"+imgs[2].picName+"&picAddr3"+imgs[2].picAddr;
    console.log(parm);
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:parm,
      success:function(info) {
        //console.log(info);
        $('#addModal').modal('hide');
        render();
        $('form').data('bootstrapValidator').resetForm(true);
        imgs = [];
        $('.drapdown-text').text('请选择二级分类');
        $('.img_box img').remove();
      }
    })
  })




})
$(function () {

  //表单校验插件 依赖于bootstrap
  $('form').bootstrapValidator({

    //各种检验状态的小图标 校验成功 检验失败 校验中对应不同的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //校验内容
    fields: {
      //用户名
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //自定义状态对应的提示文本
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12位之间'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })
})

//需要给表单注册一个校验成功的事件  success.form.bv
$('form').on('success.form.bv', function (e) {

  e.preventDefault();
  //console.log('hiehie');
  $.ajax({
    type: 'post',
    url: '/employee/employeeLogin',
    data: $('form').serialize(),
    success: function (info) {
      console.log('hiehie');
      if (info.success) {
        location.href = "index.html";
      }
      if (info.error === 1000) {
        //alert('用户名不存在');
        //手动调用方法，updateStatus让username校验失败即可
        //第一个参数：改变哪个字段
        //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
        //第三个参数：选择提示的信息
        $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
      }
      if (info.error === 1001) {
        // alert('密码错误');
        $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
      }
    }
  })
})

  //重置功能，重置样式
  $("[type='reset']").on('click',function(){

    $('form').data('bootstrapValidator').resetForm();
  })
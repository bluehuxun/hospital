var app = getApp();
Page({
    data: {
        img_url : app.global_data.img_url,
        phone : '',
        pass : '',
        get_code_text : '获取验证码',
        btn_disabled : false,	//获取短信验证码的按钮是否禁用
    },
    onLoad(){
        wx.request({
            url: 'http://192.168.0.107:8880/yhapp/httpServer_mini',
            data: {

            },
            header:{
                "Content-Type":"application/json"
            },
            success: function(res) {
                console.log('success', res)
            },
            fail: function(res) {
                console.log('fail', res)
            },
            complete: function(res) {
                console.log('complete', res)
            }
        })
    },
    get_code(){
        var that = this;
        var phone = that.data.phone;
        var phone_reg = /^1\d{10}$/;
        console.log(phone);
        if(!phone){
            app.showModal('请输入手机号码');
            return;
        }
        if(!phone_reg.test(phone)){
            app.showModal('您输入的手机号码格式不正确，请重新输入');
            return;
        }
        var num = 60;
        var data = {
            requesttype : '101',
            phone : that.data.phone,
            type : '1'
        };
        var time = setInterval(function(){
            num--;
            if(num > 0){
                var get_code_text = num + '秒后再获取';
                that.setData({
                    get_code_text : get_code_text,
                    btn_disabled : true
                });

            }
            else{
                clearInterval(time);
                that.setData({
                    get_code_text : '再次获取',
                    btn_disabled : false
                });
            }

        }, 1000);
    },
    get_phone(e){
      var phone = e.detail.value;
      this.setData({
          phone
      });
    },
    get_pass(e){
        var pass = e.detail.value;
        this.setData({
            pass
        });
    },
    submit(){
        var that = this;
        var phone = that.data.phone;
        var pass = that.data.pass;
        if(!phone){
            app.showModal('请输入手机号码');
            return;
        }
        if(!pass){
            app.showModal('请输入验证码');
            return;
        }
    },
});
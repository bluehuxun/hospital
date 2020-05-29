App({
    global_data : {
        // ajax_url : 'http://10.173.64.204:8808/',    //远程
        // ajax_url : 'http://www.hyxylwsfwzx.com:8199/',
        // ajax_url : 'http://www.hyxylwsfwzx.com:8199/',
        // ajax_url : 'http://192.168.0.107:8088/',
        ajax_url : 'https://www.hyxylwsfwzx.com/',//正式服务(海盐小程序的服务器)
        // ajax_url : 'http://10.173.64.157:8090/',
        // ajax_url : 'http://192.168.0.100:8080/',
        // ajax_url : 'http://192.168.43.85:8080/',
        img_url : 'https://www.hyxylwsfwzx.com/platform/img/img/',
        img_url2 : 'http://192.168.0.186/img/',
        openid : ''
        // img_url : '../../../img/'
    },
    onLaunch: function () {
        this.get_openid();
    },
    showModal : function (content) {
      wx.showModal({
          content,
          showCancel : false,
          confirmColor : '#1abb85'
      });
    },
    no_online(){
        this.showModal('该功能暂未开放,敬请期待');
    },
    get_openid(){
        let that = this;
        // let app = getApp();
        // app.global_data.openid = '12';
        var openid = wx.getStorageSync('openid');
        if(!openid){
            wx.login({
                success: function (res) {
                    console.log(res,"这里是登录页面");
                    if (res.code) {
                        var appid = 'wx0cdf5673fafc32c6';
                        var secret = 'b82fb7554ef792af856920547dce7e9e';
                        var js_code = res.code;
                        var url = that.global_data.ajax_url + 'platform/GetOpenid';
                        let data = {
                            js_code
                        };
                        //发起网络请求
                        wx.request({
                            url,
                            method : 'POST',
                            data,
                            success(res) {
                                var openid = res.data.openid;
                                that.global_data.openid = openid;
                                // that.setData({
                                //     openid
                                // });
                                wx.setStorageSync("openid", openid);
                                // if(fun_name == 'to_hos'){
                                //     get_list(that, 'hospitals', 'subject');
                                // }
                                // else if(fun_name == 'to_report_search'){
                                //     get_list(that, '', '', 'to_report_search');
                                // }
                            },
                            fail(res){
                                console.log('fail', res)
                            },
                            complete(res){
                                console.log('complete', res)
                            }
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            });
        }
        else{
            that.global_data.openid = openid;
            // if(fun_name == 'to_hos'){
            //     get_list(that, 'hospitals', 'subject');
            // }
            // else if(fun_name == 'to_report_search'){
            //     get_list(that, '', '', 'to_report_search');
            // }
        }
    },
    // 根据身份证号码，获取年龄
    GetAge(identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    // 根据身份证，获取性别
    Getsex(psidno){
        var sexno,sex
        if(psidno.length==18){
            sexno=psidno.substring(16,17)
        }else if(psidno.length==15){
            sexno=psidno.substring(14,15)
        }else{
            alert("错误的身份证号码，请核对！")
            return false
        }
        var tempid=sexno%2;
        if(tempid==0){
            sex='F'
        }else{
            sex='M'
        }
        return sex
    }
});
/*
face.js:人脸核身-用户上传照片身份信息核验
* */
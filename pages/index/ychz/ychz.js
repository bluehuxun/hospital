let that;
let app = getApp();
Page({
    data: {
        img_url : app.global_data.img_url,
        hosnum : '',
        index : 0,
        objectArray : [],
        dep_index : 0,
        dep_list : [],
        userkey : '',
        name : '',
        nodecode : '',
        persondept : ''
    },
    onLoad(){
        that = this;
        wx.showLoading({
            title: '加载中...',
        });
        get_openid(that);
    },
    bindPickerChange(e){
        wx.showLoading({
            title: '加载中...',
        });
        let index = e.detail.value;
        let hosnum = that.data.objectArray[index].hosnum;
        that.setData({
            index
        });
        get_dep_list(that, hosnum);
    },
    dep_Change(e){
        let dep_index = e.detail.value;
        that.setData({
            dep_index
        });
    },
    get_userkey(e){
        let userkey = e.detail.value;
        that.setData({
            userkey
        });
    },
    get_name(e){
        let name = e.detail.value;
        that.setData({
            name
        });
    },
    get_persondept(e){
        let persondept = e.detail.value;
        that.setData({
            persondept
        });
    },
    submit(){
        //requesttype,hosnum,userkey,name,nodecode,persondept,wechat
        let requesttype = '1023';
        let hosnum = that.data.objectArray[that.data.index].hosnum;
        let userkey = that.data.userkey;
        let name = that.data.name;
        let nodecode = that.data.objectArray[that.data.index].nodecode;
        let persondept = that.data.dep_list[that.data.dep_index].deptcode;
        let wechat = that.data.openid;
        if(userkey == ''){
            app.showModal('请输入工号');
            return;
        }
        if(name == ''){
            app.showModal('请输入姓名');
            return;
        }
        if(persondept == ''){
            app.showModal('请选择科室');
            return;
        }
        wx.showLoading({
            title: '加载中...',
        });
        console.log(requesttype,hosnum,userkey,name,nodecode,persondept,wechat);
        submit(requesttype,hosnum,userkey,name,nodecode,persondept,wechat);
    }
});

function get_openid(that){
    var openid = wx.getStorageSync('openid');
    if(!openid){
        wx.login({
            success: function (res) {
                if (res.code) {
                    var appid = 'wx0cdf5673fafc32c6';
                    var secret = 'b82fb7554ef792af856920547dce7e9e';
                    var js_code = res.code;
                    var url = app.global_data.ajax_url + 'platform/GetOpenid';
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
                            that.setData({
                                openid
                            });
                            get_list(that);
                            wx.setStorageSync("openid", openid);
                        },
                        fail(res){
                        },
                        complete(res){
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
    }
    else{
        that.setData({
            openid
        });
        get_list(that);
    }
}

function get_list(that) {
    wx.request({
        // url: 'https://www.hyxylwsfwzx.com/platform/HYServer?requesttype=1024',
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=1024',
        success(res) {
            console.log('res', res);
            let objectArray = res.data.data;
            let hosnum = objectArray[0].hosnum;
            let nodecode = objectArray[0].nodecode;
            that.setData({
                objectArray, hosnum, nodecode
            });
            get_dep_list(that, hosnum);
        },
        fail(res){
            console.log(res);
        },
        complete(res){
        }
    });
}

function get_dep_list(that, hosnum) {
    wx.request({
        url: app.global_data.ajax_url + `platform/HYServer?requesttype=1025&hosnum=${hosnum}`,
        success(res) {
            let dep_list = res.data.data;
            console.log('dep_list', dep_list)
            that.setData({
                dep_list
            });
        },
        fail(res){
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });
}

function submit(requesttype,hosnum,userkey,name,nodecode,persondept,wechat){
    let data = {
        requesttype,hosnum,userkey,name,nodecode,persondept,wechat
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + `platform/HYServer?requesttype=${requesttype}&hosnum=${hosnum}&userkey=${userkey}&name=`+ encodeURIComponent(name) + `&nodecode=${nodecode}&persondept=${persondept}&wechat=${wechat}`,
        success(res) {
            console.log('res', res);
            let errorMsg = res.data.errorMsg;
            let stateCode = res.data.stateCode;
            if(stateCode == 0){
                wx.showToast({
                    title: errorMsg,
                    icon: 'success',
                    duration: 2000
                });
            }
            else{
                app.showModal(errorMsg);
            }
        },
        fail(res){
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });
}
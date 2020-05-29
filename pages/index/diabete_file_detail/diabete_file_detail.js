let app = getApp();
let that;
let flag = 0;
Page({
    data : {
        img_url : app.global_data.img_url,
    },
    onLoad(query){
        that = this;
        wx.showLoading({
            title : '加载中...'
        });
        let id = query.id;
        let sfzh = query.sfzh;
        let sick = query.sick;
        that.setData({
            sick
        });
        get_list(that, id,sfzh);
    },
});

// 专项列表
function get_list(that, id,sfzh) {
    
    let requesttype;
    let sick = that.data.sick;
   // let sfzh = that.data.sfzh;
    if(sick == 1){
        requesttype = '1004';
    }
    else if(sick == 2){
        requesttype = '1007';
    }
    else if(sick == 3){
        requesttype = '1010';
    }
    else if(sick == 4){
        requesttype = '1013';
    }
    else if(sick == 5){
        requesttype = '1016';
    } 
    else if(sick == 6){
        requesttype = '1027';
    } 
    else if(sick == 7){
        requesttype = '1029';
    } 
    else if(sick == 8){
        requesttype = '102812';
    }



    // 上线前，改成之前选择人的身份证号码
    let zjhm = id;
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=' + requesttype + '&zjhm=' + id+ '&sfzh=' + sfzh,
        success(res) {
            wx.hideLoading();
            console.log('res', res);
            let list = res.data.data;
            let errorMsg = res.data.errorMsg;
            let stateCode = res.data.stateCode;
            console.log('list', list, list.length, list.length == 0, list == '');
            that.setData({
                list, errorMsg
            });
        },
        fail(res){
            console.log(res);
        },
        complete(){
            wx.hideLoading();
        }
    });
}

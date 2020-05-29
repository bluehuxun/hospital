let app = getApp();
let that;
let flag = 0;
Page({
    data : {
        img_url : app.global_data.img_url,
        // 上线前，把下面的type改回1
        type : '1',
        page : '1',
        // 以后把下面的rp改成10
        rp : '10',
        visit : [],
        list : [],

        hasMoreData: true,
        clientY1 : 0,
        clientY2 : 0,
        screenHeight : '',
        more_data : true,	//判断分页有没有更多数据
    },
    onLoad(query){
        that = this;
        flag = 0;
        wx.showLoading({
            title : '加载中...'
        });
        let sick = query.sick;
        let zjhm = query.idcard;
        that.setData({
            sick, zjhm
        });
        get_special_pro_list(that);
        get_visit(that);
    },
    touchstart(e){
        var that = this;
        var clientY1 = e.changedTouches[0].clientY;
        that.setData({
            clientY1
        });
    },
    touchend(e){
        var that = this;
        var clientY2 = e.changedTouches[0].clientY;
        that.setData({
            clientY2
        });
        var clientY1 = that.data.clientY1;
        if(clientY2 < clientY1){
            var page = parseInt(that.data.page);
            ++page;
            page = page.toString();
            that.setData({
                page
            });
            var more_data = that.data.more_data;
            if(more_data){
                get_visit(that);
            }
        }
    },
    set_type(e){
        let type = e.currentTarget.dataset.type;
        that.setData({
            type
        });
    },
    to_detail(e){
        let id = e.currentTarget.dataset.id;
        let sfzh = e.currentTarget.dataset.sfzh;
        let sick = that.data.sick;
        wx.navigateTo({
            url: '../diabete_file_detail/diabete_file_detail?id=' + id + '&sick=' + sick+ '&sfzh=' +sfzh
        });
    }
});

// 专项列表
function get_special_pro_list(that) {
  
    let requesttype;
    // 上线前，改成之前选择人的身份证号码
    let zjhm = that.data.zjhm;
    let sick = that.data.sick;
    if(sick == 1){
        requesttype = '1002';
        // zjhm = '330424194612193841';
    }
    else if(sick == 2){
        requesttype = '1005';
        // zjhm = '330424194410091011';
    }
    else if(sick == 3){
        requesttype = '1008';
        // zjhm = '330424193911170012';
    }
    else if(sick == 4){
        requesttype = '1011';
        // zjhm = '330424194702283816';
    }
    else if(sick == 5){
        requesttype = '1014';
        // zjhm = '33042419491210082X';
    }
     else if(sick == 8){
        requesttype = '1028';
        // zjhm = '33042419491210082X';
    }



    let data = {
        requesttype, zjhm
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=' + requesttype + '&zjhm=' + zjhm,
        success(res) {
            let special_pro = res.data.data;
            console.log('special_pro', special_pro);
            if(special_pro.lxdh){
                special_pro.lxdh = special_pro.lxdh.substr(0, 11);
            }
            if(special_pro != ''){
                that.setData({
                    special_pro
                }, function () {
                    let win_h = wx.getSystemInfoSync().windowHeight;
                    // 获取.top的高度
                    wx.createSelectorQuery()
                        .select('.top').boundingClientRect()
                        .selectViewport().boundingClientRect()
                        .selectViewport().scrollOffset().exec((ret) => {
                        let top_h = ret[0].height;
                        that.setData({
                            win_h, top_h
                        });
                    });
                });
            }
            else{
                that.setData({
                    special_pro
                });
            }
        },
        fail(res){
        },
        complete(){
            ++flag;
            console.log('flag 143', flag);
            hide_loading(2);
        }
    });
}

// 随访记录
function get_visit(that) {
    let requesttype;
    // 上线前，改成之前选择人的身份证号码
    let zjhm = that.data.zjhm;
    let sick = that.data.sick;
    if(sick == 1){
        requesttype = '1003';
    }
    else if(sick == 2){
        requesttype = '1006';
    }
    else if(sick == 3){
        requesttype = '1009';
    }
    else if(sick == 4){
        requesttype = '1012';
    }
    else if(sick == 5){
        requesttype = '1015';
    }
    else if(sick == 6){
        requesttype = '1027';
        // zjhm = '33042419491210082X';
    }
    else if(sick == 7){
        requesttype = '1029';
        // zjhm = '33042419491210082X';
    } else if(sick == 8){
        requesttype = '1028';
        // zjhm = '33042419491210082X';
    }
    let page = that.data.page;
    let rp = that.data.rp;
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=' + requesttype + '&zjhm=' + zjhm + '&page=' + page + '&rp=' + rp,
        success(res) {
            let stateCode = res.data.stateCode;
            if(stateCode == 0){
                let visit = res.data.data.list;

                // var new_list = res.data;
                var rp = that.data.rp;
                if(visit.length < parseInt(rp)){
                    var more_data = false;
                    that.setData({
                        more_data
                    });
                }
                if(visit.length > 0){
                    var list = that.data.list.concat(visit);
                    that.setData({
                        list
                    });
                }
            }


            // that.setData({
            //     visit
            // });
        },
        fail(res){
        },
        complete(){
            ++flag;
            console.log('flag 205', flag);
            hide_loading(2);
        }
    });
}

// 隐藏loading
function hide_loading(num) {
    ++flag;
    if(flag == num){
        wx.hideLoading();
    }
}

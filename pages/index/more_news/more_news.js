let app = getApp();
Page({
  data: {
      img_url : app.global_data.img_url,
      curpage : '1',
      // 上线前，把下面的pagesize改成10
      pagesize : '10',
      clientY1 : 0,
      clientY2 : 0,
      more_data : true,
      news_list : []
  },
  onLoad(){
    var that = this;
      let win_h = wx.getSystemInfoSync().windowHeight;
      that.setData({
          win_h
      });
    get_news_list(that);
  },
    touchstart(e){
        let that = this;
        let clientY1 = e.changedTouches[0].clientY;
        that.setData({
            clientY1
        });
    },
    touchend(e){
        let that = this;
        let clientY2 = e.changedTouches[0].clientY;
        that.setData({
            clientY2
        });
        let clientY1 = that.data.clientY1;
        console.log(clientY1, clientY2);
        if(clientY2 < clientY1){
            let curpage = parseInt(that.data.curpage);
            ++curpage;
            curpage = curpage.toString();
            console.log(curpage);
            that.setData({
                curpage
            });
            let more_data = that.data.more_data;
            if(more_data){
                wx.showLoading({
                    title: '加载中...',
                });
                get_news_list(that);
            }
        }
    },
    no_online(){
      let that = this;
      that.data.no_online();
    },
    to_heath_file(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=health_file'
            });
        }
        else{
            wx.navigateTo({
                url: '../sel_patient2/sel_patient2?to=heath_file_class'
                // url: '../sel_patient2/sel_patient2?to=health_file'
            });
        }
    },
    to_hos(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=hospitals'
            });
        }
        else{
            wx.reLaunch({
                url: '../hospitals/hospitals?to=subject'
            });
        }
    },
    to_report_search(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=report_search'
            });
        }
        else{
            wx.navigateTo({
                url: '../sel_patient2/sel_patient2?to=report_search'
            });
        }
    },
    to_body_exam_report(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=body_exam_report'
                // url: '../member_manage/member_manage?to=body_exam_report'
            });
        }
        else{
            wx.navigateTo({
                url: '../sel_patient2/sel_patient2?to=body_exam_report'
            });
        }
    },
    to_sign_manage(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=sel_patient'
                // url: '../member_manage/member_manage?to=body_exam_report'
            });
        }
        else{
            wx.reLaunch({
                url: '../sel_patient/sel_patient'
            });
        }
    },
  to_sel_hospital(e){
    this.sel_hospital();
  },
    to_appoint_lead(){
        wx.navigateTo({
            url: '../appoint_lead/appoint_lead'
        });
    },
    to_more_serve(){
        let that = this;
        let member_num = that.data.member_num;
        if(member_num == 0){
            wx.navigateTo({
                url: '../member_manage/member_manage?to=more_serve'
            });
        }
        else{
            wx.navigateTo({
                url: '../sel_patient2/sel_patient2?to=more_serve'
            });
        }
    },
    to_more_news(){
        wx.navigateTo({
            url: '../more_news/more_news'
        });
    },
    sel_hospital(e) {
    this.setData({
      hospital_index: e.detail.value
    });
  },
  // swiper下面的图片加载完时，设置swiper的高度
  imageLoad(e) {
      var imgwidth = e.detail.width, imgheight = e.detail.height, ratio = imgheight / imgwidth;
      this.setData({
          swiper_h: wx.getSystemInfoSync().windowWidth * ratio
      });
  },
  get_detail(e){
      let url = e.currentTarget.dataset.url;
      console.log('url', url);
      wx.navigateTo({
          url: '../news/news?url=' + url
      });
  }
});

// 获取患者数量
function get_member_num(that) {
    let member_num;

    var openid = app.global_data.openid;
    var data = {
        openid
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetPersonInfoByOpenid',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            var code = res.data.code;
            if(code == 0){
                var list = res.data.data;
                console.log('list', list, list.length);
                member_num = list.length;
                that.setData({
                    member_num
                });
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

function get_list(that, nav1, nav2, fun_name) {
    var openid = wx.getStorageSync('openid');
    var data = {
        openid
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetPersonInfoByOpenid',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            var code = res.data.code;
            if(code == 0){
                var list = res.data.data;
                console.log('list', list, list.length);
                if(list.length == 0){
                    wx.navigateTo({
                        url: '../member_manage/member_manage?to=' + nav1
                    });
                }
                else{
                    wx.reLaunch({
                        url: '../hospitals/hospitals?to=' + nav2
                    });
                }
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

// 获取健康教育列表
function get_news_list(that) {
    let requesttype = '1022';
    let pagesize = that.data.pagesize.toString();
    let curpage = that.data.curpage.toString();
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=' + requesttype + '&curpage=' + curpage + '&pagesize=' + pagesize,
        success(res) {
            console.log('res', res);
            let new_list = (res.data.data);
            let pagesize = that.data.pagesize;
            if(new_list.length < parseInt(pagesize)){
                let more_data = false;
                that.setData({
                    more_data
                });
            }
            if(new_list.length > 0){
                let news_list = that.data.news_list.concat(new_list);
                that.setData({
                    news_list
                });
            }

            // console.log('res', res);
            // let news_list = res.data.data;
            // console.log('news_list', news_list);
            // that.setData({
            //     news_list
            // });
        },
        fail(res){
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });
}
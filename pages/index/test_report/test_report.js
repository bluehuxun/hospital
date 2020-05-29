var app = getApp();
Page({
    data : {
        img_url : app.global_data.img_url,
        times: ['全部', '一星期', '一个月', '三个月'],
        times_index: 0,
        list : ''
    },
    onLoad(query) {
      var that = this;
      wx.showLoading({
        title: '加载中...',
      });
      console.log(query);
      var idcard = query.idcard;
      var patname = query.patname;
      that.setData({
          idcard, patname
      });
      get_list(that);
    },
    set_time (e) {
        this.setData({
          times_index: e.detail.value
        });
    },
    get_detail(e){
        var that = this;
        var reportno = e.currentTarget.dataset.reportno;
        var jgdm = e.currentTarget.dataset.jgdm;
        var assaydate = e.currentTarget.dataset.assaydate;
        var reporttype = e.currentTarget.dataset.reporttype;
        wx.navigateTo({
            url: '../report_detail/report_detail?reportno=' + reportno + '&jgdm=' + jgdm + '&assaydate=' + assaydate + '&reporttype=' + reporttype
        });
        return;
        console.log(reportno);
        var data = {
            reportno
        };
        data = JSON.stringify(data);
        wx.request({
            url: app.global_data.ajax_url + 'platform/Getjybg',
            method : 'POST',
            data,
            success(res) {
                console.log(res);
                var ReturnCode = res.data.ReturnCode;
                if(ReturnCode == 0){

                }
            },
            fail(res){
                console.log(res);
            }
        });
    }
});
function get_list(that) {
    var cardno = that.data.idcard;
    var startdate = '';
    var patname = that.data.patname;
    // var patname = wx.getStorageSync('patname');
    var data = {
        cardno, startdate, patname
    };
    data = JSON.stringify(data);
    console.log(cardno, patname);
    wx.request({
        url: app.global_data.ajax_url + 'platform/Getbglb',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            wx.hideLoading();
            var ReturnCode = res.data.ReturnCode;
            if(ReturnCode == 0){
                var list = res.data.data;
                that.setData({
                    list
                });
            }
        },
        fail(res){
            console.log(res);
        }
    });

}
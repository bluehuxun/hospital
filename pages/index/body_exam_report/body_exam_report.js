const app = getApp();
Page({
    data : {
        times: ['全部', '一星期', '一个月', '三个月'],
        times_index: 0,
        list : '',
        idcard : '',
        img_url : app.global_data.img_url
    },
    onLoad(query) {
      var that = this;
      wx.showLoading({
          title: '加载中...',
      });
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
        var pexamid = e.currentTarget.dataset.pexamid;
        var jgdm = e.currentTarget.dataset.jgdm;
        var examname = e.currentTarget.dataset.examname;
        var examdate = e.currentTarget.dataset.examdate;
        var bdate = e.currentTarget.dataset.bdate;
        var hosname = e.currentTarget.dataset.hosname;
        var tjzj = e.currentTarget.dataset.tjzj;
        var jkjy = e.currentTarget.dataset.jkjy;
        wx.navigateTo({
            url: '../body_exam_detail/body_exam_detail?pexamid=' + pexamid + '&jgdm=' + jgdm + '&examname=' + examname + '&examdate=' + examdate + '&bdate=' + bdate + '&hosname=' + hosname + '&tjzj=' + tjzj + '&jkjy=' + jkjy
        });
    }
});
function get_list(that) {
    var idcard = that.data.idcard;
    var data = {
        idcard
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/Gettjbglb',
        method : 'POST',
        data,
        success(res) {
            wx.hideLoading();
            var ReturnCode = res.data.ReturnCode;
            if(ReturnCode == 0){
                var list = res.data.data;
                console.log(list.length);
                if(list.length > 0){
                    var patname = res.data.data[0].patname;
                    var hosname = res.data.data[0].hosname;
                    var idnum = res.data.data[0].idnum;
                    var sex = res.data.data[0].sex;
                    var age = res.data.data[0].age;
                    that.setData({
                        list, patname, hosname, idnum, sex, age
                    });
                }

            }
        },
        fail(res){
            console.log(res);
        }
    });

}
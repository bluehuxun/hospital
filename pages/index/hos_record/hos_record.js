const app = getApp();
Page({
    data : {
        times: ['全部', '一星期', '一个月', '三个月'],
        times_index: 0,
        idcard : '',
        img_url : app.global_data.img_url,
        list : [],
        curpage : '1',
        pagesize : '10',
        hasMoreData: true,
        clientY1 : 0,
        clientY2 : 0,
        screenHeight : '',
        more_data : true,	//判断分页有没有更多数据
    },
    onLoad(query) {
      var that = this;
      wx.showLoading({
          title: '加载中...',
      });
      let win_h = wx.getSystemInfoSync().windowHeight;
      var idcard = query.idcard;
      var patname = query.patname;
      that.setData({
          idcard, patname, win_h
      });
      get_list(that);
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
        console.log(clientY1, clientY2);
        if(clientY2 < clientY1){
            var curpage = parseInt(that.data.curpage);
            ++curpage;
            curpage = curpage.toString();
            console.log(curpage);
            that.setData({
                curpage
            });
            var more_data = that.data.more_data;
            if(more_data){
                wx.showLoading({
                    title: '加载中...',
                });
                get_list(that);
            }
        }
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
    // 上线前，把下面的idcard改成that.data.idcard
    let idcard = that.data.idcard;
    let pagesize = that.data.pagesize;
    let curpage = that.data.curpage;
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=1021&sfzh=' + idcard + '&pagesize=' + pagesize + '&curpage=' + curpage,
        success(res) {
            console.log('res', res);

            var new_list = JSON.parse(res.data.data);
            console.log(new_list);
            console.log(new_list.length);
            console.log(parseInt(pagesize));
            var pagesize = that.data.pagesize;
            if(new_list.length < parseInt(pagesize)){
                var more_data = false;
                that.setData({
                    more_data
                });
            }
            if(new_list.length > 0){
                var list = that.data.list.concat(new_list);
                that.setData({
                    list
                });
                console.log('list', list);
            }

            // var list = JSON.parse(res.data.data);
            // console.log('list', list);
            // that.setData({
            //     list
            // });
        },
        fail(res){
            console.log(res);
        },
        complete(){
            wx.hideLoading();
        }
    });

}
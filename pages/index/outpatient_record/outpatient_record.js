const app = getApp();
Page({
    data : {
        idcard : '',
        img_url : app.global_data.img_url,
        list : [],
        curpage : '1',
        pagesize : '10',
        clientY1 : 0,
        clientY2 : 0,
        more_data : true,	//判断分页有没有更多数据
    },
    onLoad(query) {
      let that = this;
      wx.showLoading({
          title: '加载中...',
      });
      let win_h = wx.getSystemInfoSync().windowHeight;
      let idcard = query.idcard;
      console.log('idcard', idcard);
      that.setData({
          idcard, win_h
      });
      get_list(that);
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
        let that = this;
        let pexamid = e.currentTarget.dataset.pexamid;
        let jgdm = e.currentTarget.dataset.jgdm;
        let examname = e.currentTarget.dataset.examname;
        let examdate = e.currentTarget.dataset.examdate;
        let bdate = e.currentTarget.dataset.bdate;
        let hosname = e.currentTarget.dataset.hosname;
        let tjzj = e.currentTarget.dataset.tjzj;
        let jkjy = e.currentTarget.dataset.jkjy;
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
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=1020&sfzh=' + idcard + '&pagesize=' + pagesize + '&curpage=' + curpage,
        success(res) {
            let new_list = JSON.parse(res.data.data);
            let pagesize = that.data.pagesize;
            if(new_list.length < parseInt(pagesize)){
                let more_data = false;
                that.setData({
                    more_data
                });
            }
            if(new_list.length > 0){
                let list = that.data.list.concat(new_list);
                that.setData({
                    list
                });
            }
        },
        fail(res){
            console.log(res);
        },
        complete(){
            wx.hideLoading();
        }
    });
}
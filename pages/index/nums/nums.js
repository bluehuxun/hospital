var app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      query : ''
  },
  onLoad(query){
    console.log(query,"加载完成后num页面")
      let that = this;
      let regdate = query.regtime;
      let patname = query.patname;
      let departname = query.departname;
      that.setData({
          query, departname, regdate, patname
      });
      get_list(that);
  },
  to_detail(e){
      let that = this;
      let patname = that.data.patname;
      let regdate = that.data.regdate;
      let departname = that.data.query.departname;
      let hosnum = that.data.query.hosnum;
      let schtime = that.data.query.schtime;
      let regnotype = that.data.query.regnotype;
      let deptid = that.data.query.deptid;
      let medino = that.data.query.medino;
      let username = that.data.query.username;
      let resno = e.currentTarget.dataset.resno;
      let schid = e.currentTarget.dataset.schid;
      let regtime = e.currentTarget.dataset.regtime;
    console.log(regtime)
      wx.navigateTo({
          url: '../confirm/confirm?hosnum=' + hosnum + '&regtime=' + regtime + '&schtime=' + schtime + '&regnotype=' + regnotype + '&deptid=' + deptid + '&medino=' + medino + '&username=' + username + '&resno=' + resno + '&schid=' + schid + '&departname=' + departname + '&regdate=' + regdate + '&patname=' + patname
      });
  }
});
function get_list(that) {
    let data = that.data.query;
    let hosnum = data.hosnum;
    let regtime = data.regtime;
    let schtime = data.regtime;
    console.log(data,"请求需要的参数");
    data = JSON.stringify(data);
    var oldtime=new Date().getTime()
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetNumSourceInfo',
        method : 'POST',
        data,
        success(res) {
            var nowtime = new Date().getTime()
            console.log(res);
        //   console.log("相差", nowtime - oldtime)
            let code = res.data.code;
            if(code == 0){
                var list = res.data.data;
                that.setData({
                    list
                });
            }
            else{
                let message = res.data.message;
                app.showModal(message);
            }
        },
        fail(res){
            let message = res.data.message;
            app.showModal(message);
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });
}
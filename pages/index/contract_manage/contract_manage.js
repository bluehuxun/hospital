const app=getApp();
Page({
  data : {
    img_url : app.global_data.img_url,
    window_h : 0
  },
  onLoad(query){
	  var that = this;
      console.log(query);
      var idcard = query.idcard;
	  that.setData({
          idcard
      });
	  get_list(that);
  },
});
function get_list(that) {
    var idcard = that.data.idcard;
    var data = {
        idcard
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/Qyxx',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            var ReturnCode = res.data.ReturnCode;
            if(ReturnCode == 0){
                var list = res.data.data;
                that.setData({
                    list
                });
            }
            else{
                var ReturnInfo = res.data.ReturnInfo;
                app.showModal(ReturnInfo);
            }
        },
        fail(res){
            console.log(res);
        }
    });

}
const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      times: ['全部', '一星期', '一个月', '三个月'],
      times_index: 0,
  },
  onLoad(e) {
    
  },
  set_time: function (e) {
    this.setData({
      times_index: e.detail.value
    });
  },
})
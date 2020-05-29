const app = getApp();
const window_h = wx.getSystemInfoSync().windowHeight;
Page({
  data : {
      img_url : app.global_data.img_url,
      // 控制搜索结果列表是否显示
      sel_subject: "true"
  },
  onLoad(){
    this.setData({
      small_subject_h: window_h - 60
    });
  },
})
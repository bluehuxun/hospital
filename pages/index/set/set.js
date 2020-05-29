const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url
  },
  onLoad(query){
      var that = this;
  },
  out(){
      var that = this;
      wx.clearStorage();
      wx.reLaunch({
          url : '../index/index'
      });
  }
});
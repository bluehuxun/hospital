const ratio = wx.getSystemInfoSync().windowWidth / 750;
const app = getApp();
Page({
  data: {
      img_url : app.global_data.img_url,
      ratio,
      hospital_type: 0
  },
  change_hospital_type(e){
    var that = this;
    var hospital_type = e.target.dataset.hospital_type;
    that.setData({
      hospital_type: hospital_type
    });
  }
})
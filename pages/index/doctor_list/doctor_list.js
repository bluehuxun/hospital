const app = getApp();
const ratio = wx.getSystemInfoSync().windowWidth / 750;
var doctor_info_w = wx.getSystemInfoSync().windowWidth - 20 - 30
Page({
  data: {
      img_url : app.global_data.img_url,
      ratio,
      hospital_type: 0,
      doctor_info_w: doctor_info_w
  },
  change_hospital_type(e){
    var that = this;
    var hospital_type = e.target.dataset.hospital_type;
    that.setData({
      hospital_type: hospital_type
    });
  }
})
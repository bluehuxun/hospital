const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      patient_array: ['刘叶青', '刘叶青2'],
      patient_index: 0,
  },
  patient_change(e) {
    this.setData({
      patient_index: e.detail.value
    });
  },
  confirm_regist(){
    wx.showToast({
      title: '挂号成功',
      icon: 'success',
      duration: 1000
    });
  }
})
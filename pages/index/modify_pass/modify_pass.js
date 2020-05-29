const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img_url : app.global_data.img_url
  },
  confirm(){
    var that = this;
    if (!that.data.now_pass){
      wx.showModal({
        title: '',
        content: '请输入当前密码',
        showCancel : false,
      });
      return;
    }
    if (!that.data.new_pass) {
      wx.showModal({
        title: '',
        content: '请输入新密码',
        showCancel: false,
      });
      return;
    }
    if (!that.data.confirm_new_pass){
      wx.showModal({
        title: '',
        content: '请输入确认密码',
        showCancel: false,
      });
      return;
    }
    if (that.data.confirm_new_pass != that.data.new_pass) {
      wx.showModal({
        title: '',
        content: '您输入的确认密码和新密码不一致，请重新输入',
        showCancel: false,
      });
      return;
    }
    wx.showToast({
      title: '修改密码成功',
      icon: 'success',
      duration: 2000
    });
    wx.reLaunch({
      url: '../index/index'
    });
  },
  now_pass(e){
    this.setData({
      now_pass : e.detail.value
    });
  },
  new_pass(e) {
    this.setData({
      new_pass: e.detail.value
    });
  },
  confirm_new_pass(e) {
    this.setData({
      confirm_new_pass: e.detail.value
    });
  },
});
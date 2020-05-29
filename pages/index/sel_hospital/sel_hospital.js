const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img_url : app.global_data.img_url,
      array: ['海盐县人民医院', '海盐县中医院']
  },
  get_con(e){
    var index = e.currentTarget.dataset.text;
    wx.setStorage({ 
      key: "hospital_name",
      data: index
    });
    wx.reLaunch({
      url: '../index/index'
    });
  }
})
const app = getApp();
var window_h = wx.getSystemInfoSync().windowHeight;
Page({
  data : {
      img_url : app.global_data.img_url,
      intro_type : 0
  },
  onLoad(){
    
  },
  
  change_intro_type(e){
    var intro_type = e.currentTarget.dataset.intro_type;
    this.setData({
      intro_type: intro_type
    });
  },
  hospital_nav() {
    var latitude = 30.5168260854;
    var longitude = 120.9255848195;
    wx.openLocation({
      name: '海盐县人民医院',
      address: '浙江省海盐县武原街道盐湖西路901号',
      latitude: latitude,
      longitude: longitude,
      scale: 28
    });
  },
  imageLoad: function (e) {
    var that = this;
    var viewWidth = 12 * window_h / 750;
    var viewHeight = 16 * window_h / 750;    
    that.setData({
      imgwidth: viewWidth,
      imgheight: viewHeight
    })
  }

})
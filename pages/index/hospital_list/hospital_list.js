const app = getApp();
const ratio = wx.getSystemInfoSync().windowWidth / 750;
Page({
  data: {
      img_url : app.global_data.img_url,
      ratio,
      hospital_type: 0,
      to : ''
  },
  onLoad(query){
    console.log(query);
    var to = query.to;
    this.setData({
      to : to
    });
  },
  change_hospital_type(e){
    var that = this;
    var hospital_type = e.target.dataset.hospital_type;
    that.setData({
      hospital_type: hospital_type
    });
  },
  to_next(e){
      var that = this;
      var hos = e.currentTarget.dataset.hos;
      console.log(hos)
    var url = '../' + that.data.to + '/' + that.data.to + '?hos=' + hos;
    console.log(url)
      wx.navigateTo({
          url: '../' + that.data.to + '/' + that.data.to + '?hos=' + hos
      });
  }
});
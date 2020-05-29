const app = getApp();
const ratio = wx.getSystemInfoSync().windowWidth / 750;
Page({
  data: {
      ratio,
      hospital_type: 0,
      to : '',
      img_url : app.global_data.img_url,

  },
  onLoad(query){
    console.log(query);
    var to = query.to;
    var patname = query.patname;
    this.setData({
      to, patname
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
      let patname = wx.getStorageSync('patname')
      if(!patname){
        wx.navigateTo({
          url: '../add_member/add_member?to=hospitals'
        })
      }else{
        wx.navigateTo({
          url: '../appoint_know/appoint_know?hos=' + hos + '&patname=' + patname
          // url: '../' + that.data.to + '/' + that.data.to + '?hos=' + hos
      });
      }
    console.log(hos,patname,"这里是须知")
  }
});
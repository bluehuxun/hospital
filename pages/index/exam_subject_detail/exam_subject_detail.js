const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      list : []
  },
  onLoad(query){
    var that = this;
    get_list(that);
  },
});
function get_list(that) {
    var list = wx.getStorageSync('heath_list');
    console.log(list);
    that.setData({
        list
    })
}
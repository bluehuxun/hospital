const app = getApp();
const window_h = wx.getSystemInfoSync().windowHeight;
Page({
  data : {
      img_url : app.global_data.img_url,
      doc_type : 0
  },
  onLoad(){
    
  },
  
  change_doctor_type(e){
    var doc_type = e.currentTarget.dataset.doc_type;
    this.setData({
      doc_type: doc_type
    });
  }
})
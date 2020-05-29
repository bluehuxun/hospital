const app = getApp();
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
  }
})
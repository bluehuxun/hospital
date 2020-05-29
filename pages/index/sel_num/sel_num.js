const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      brief_intro : 'down',
      collect : false
  },
  onLoad(){
    
  },
  brief_intro(e){
    var brief_intro = this.data.brief_intro;
    if (brief_intro == 'down'){
      this.setData({
        brief_intro: 'up'
      });
    }
    else{
      this.setData({
        brief_intro: 'down'
      });
    }
  },
  change_collect(){
    var that = this;
    var collect = that.data.collect;
    if (collect == false){
      wx.showToast({
        title: '收藏成功',
      });
      that.setData({
        collect : true
      });
    }
    else{
      wx.showToast({
        title: '取消收藏成功',
      });
      that.setData({
        collect: false
      });
    }
  }
})
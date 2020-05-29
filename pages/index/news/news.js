let swiper_bool;  //用于放置公告的轮播函数
const app = getApp();
Page({
    data: {
      img_url : app.global_data.img_url
  },
    onLoad(query){
        let that = this;
        let url = query.url;
        console.log('url', url);
        that.setData({
            url
        });
    }
});
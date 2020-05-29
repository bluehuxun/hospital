const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img_url : app.global_data.img_url
  },
  onLoad(query){
      var that = this;
      var hos = query.hos;
      that.setData({
          hos
      });
  },
  makePhoneCall() {
      var that = this;
      var hos = that.data.hos;
      if(hos == 1){
          wx.makePhoneCall({
              phoneNumber: '0793-86962038'
          });
      }
      else if(hos == 2){
          wx.makePhoneCall({
              phoneNumber: '0793-86023817'
          });
      }
      else if(hos == 3){
          wx.makePhoneCall({
              phoneNumber: '86166261'
          });
      }
      else if(hos == 4){
          wx.makePhoneCall({
              phoneNumber: '4008783344'
          });
      }
  },
  apen_add: function (e) {
    var that = this;
    var hos = that.data.hos;
    if(hos == 1){
        var latitude = 30.493727, longitude = 120.903328;
        var name = '海盐县人民医院';
    }
    else if(hos == 2){
        var latitude = 30.453745, longitude = 120.842614;
        var name = '海盐县中医院';
    }
    else if(hos == 3){
        var latitude = 30.523138, longitude = 120.943342;
        var name = '海盐县妇幼保健院';
    }
    else if(hos == 4){
        var latitude = 30.509268, longitude = 120.932150;
        var name = '海盐县口腔医院';
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图定位功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");

              } else if (res.confirm) {
                //village_LBS(that);
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      wx.openLocation({
                        latitude: latitude,
                        longitude: longitude,
                        name: name,
                        scale: 28
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            name: name,
            scale: 28
          })
        }
      }
    })
  },
  to_hospital_in_nav(e){
      var that = this;
      var hos = that.data.hos;
      wx.navigateTo({
          url: '../hospital_in_nav/hospital_in_nav?hos=' + hos
      });
  }
});
const window_h = wx.getSystemInfoSync().windowHeight;
const app = getApp();
Page({
  data : {
      startX: 0, //开始坐标
      startY: 0,
      to : '',
      list : [],
      img_url : app.global_data.img_url
  },
    onLoad(query){
        var to = query.to;
        let that = this;
        that.setData({
            to
        });
    },
  onShow(query){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });

      var openid = app.global_data.openid;
      get_list(that);
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.list.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      list: this.data.list
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.list.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      list: that.data.list
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.list.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      list: this.data.list
    })
  },

  delete_member(e){
      var that = this;
      var openid = app.global_data.openid;
      wx.showModal({
          title: '温馨提示',
          content: '您确定删除该就诊人吗?',
          confirmColor : '#1abb85',
          success: function(res) {
              if (res.confirm) {
                  wx.showLoading({
                      title: '删除中...',
                  });
                  console.log(e);
                  var idcard = e.target.dataset.idcard;
                  var data = {
                      idcard, openid
                  };
                  data = JSON.stringify(data);
console.log(data)
                  wx.request({
                      url: app.global_data.ajax_url + 'platform/DeletePerson',
                      method : 'POST',
                      data,
                      success(res) {
                          console.log(res);
                          var code = res.data.code;
                          var message = res.data.message;
                          app.showModal(message);
                          if(code == 0){
                              get_list(that);
                          }
                      },
                      fail(res){
                          console.log(res);
                      },
                      complete(){
                          wx.hideLoading();
                      }
                  });
              } else if (res.cancel) {
              }
          }
      });
  },
    to_add_member(){
        let that = this;
        let list = that.data.list;
        if(list.length >= 3){
            app.showModal('最多添加3个人，不能继续添加');
            return false;
        }
        let to = that.data.to;
        if(to){
            wx.navigateTo({
                url: '../add_member/add_member?to=' + to
            });
        }
        else{
            wx.navigateTo({
                url: '../add_member/add_member'
            });
        }
    },
    to_verifys(){
        let that = this;
        let list = that.data.list;
        if(list.length >= 3){
            app.showModal('最多添加3个人，不能继续添加');
            return false;
        }
        let to = that.data.to;
        if(to){
            wx.navigateTo({
                url: '../../index/register/register?to=' + to
            });
        }
        else{
            wx.navigateTo({
                url: '../../index/register/register'
            });
        }
    }
});
function get_list(that) {
    var openid = wx.getStorageSync('openid');
  // var openid = "oIzvE5ADijJqfyzglqSdPwm5K_B0";
  console.log(openid,"openid的值")
    var data = {
        openid
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetPersonInfoByOpenid',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            var code = res.data.code;
            if(code == 0){
                var list = res.data.data;
                console.log('list', list);
                for(var i = 0;i < list.length;i++){
                    list[i].isTouchMove = false;
                }
                that.setData({
                    list
                });
            }
        },
        fail(res){
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });

}
const window_h = wx.getSystemInfoSync().windowHeight;
const app = getApp();
Page({
  data : {
      startX: 0, //开始坐标
      startY: 0,
      to : '',
      list : [],
      openid : '',
      tip : '',
      img_url : app.global_data.img_url
  },
  onLoad(query){
      var that = this;
      var to = query.to;
      that.setData({
          to
      });
  },
  onShow(query){
    var that = this;
    wx.showLoading({
        title: '加载中...',
    });
    let to = that.data.to;
    console.log(to);
    if(!to){
        let get_to = setInterval(function () {
            if(to){
                clearInterval(get_to);
                get_openid(that, to);
            }
        }, 10);
    }
    else{
        get_openid(that, to);
    }


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

  nav(e){
    var that = this;
    console.log(e);
    var idcard = e.currentTarget.dataset.idcard;
    var patname = e.currentTarget.dataset.patname;
    console.log('idcard', idcard, patname);
    var to = that.data.to;
    if(to){
        console.log('if to== true');
        console.log('../' + to + '/' + to + '?idcard=' + idcard + '&patname=' + patname);
        console.log(!!to);
        if(to == 'hospitals'){
            wx.reLaunch({
                url: '../' + to + '/' + to + '?idcard=' + idcard + '&patname=' + patname
            });
        }
        else{
            wx.navigateTo({
                url: '../' + to + '/' + to + '?idcard=' + idcard + '&patname=' + patname
            });
        }

    }
  }
});
function get_list(that) {
    var openid = wx.getStorageSync('openid');
    var data = {
        openid
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetPersonInfoByOpenid',
        method : 'POST',
        data,
        success(res) {
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

function get_openid(that, to) {
    // if(to == 'report_search'){
    //     var tip = '请选择您要查询的就诊人，如没有您要选择的就诊人，请至个人中心绑定';
    // }
    // else if(to == 'contract_manage'){
    //     var tip = '此报告仅作参考，以医院纸质报告为准!';
    // }
    let tip = '请选择您要查询的就诊人，如没有您要选择的就诊人，请至个人中心绑定';
    that.setData({
        tip
    });

    var openid = wx.getStorageSync('openid');
    if(!openid){
        console.log('openid');
        wx.login({
            success(res) {
                console.log(res);
                if (res.code) {
                    var appid = 'wx0cdf5673fafc32c6';
                    var secret = 'b82fb7554ef792af856920547dce7e9e';
                    var js_code = res.code;
                    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + js_code + '&grant_type=authorization_code';
                    //发起网络请求
                    wx.request({
                        url,
                        success(res) {
                            console.log('success', res);
                            var openid = res.data.openid;
                            console.log('openid', openid);
                            that.setData({
                                openid
                            });
                            wx.setStorageSync("openid", openid);
                            var openid = wx.getStorageSync('openid');
                            console.log('openid', openid);
                            get_list(that);
                        },
                        fail(res){
                            console.log('fail', res)
                        },
                        complete(res){
                            console.log('complete', res)
                        }
                    })
                }
                else {
                    console.log('登录失败！' + res.errMsg)
                }
            },
            fail(res){
                console.log(res);
            }
        });
    }
    else{
        that.setData({
            openid
        });
        get_list(that);
    }
}
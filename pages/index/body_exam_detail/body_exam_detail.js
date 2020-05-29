const window_h = wx.getSystemInfoSync().windowHeight;
const app = getApp();
Page({
  data : {
      img_url : app.global_data.img_url,
      startX: 0, //开始坐标
      startY: 0,
      to : '',
      list : []
  },
  onLoad(query){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    });
    var to = query.to;
    var pexamid = query.pexamid;
    var jgdm = query.jgdm;
    var examname = query.examname;
    var examdate = query.examdate;
    var bdate = query.bdate;
    var hosname = query.hosname;
    var tjzj = query.tjzj;
    var jkjy = query.jkjy;
    console.log(jkjy);
    console.log(typeof jkjy);
    if(jkjy == 'null'){
        jkjy = '暂无建议';
    }
    this.setData({
      to, examname, examdate, bdate, hosname, tjzj, jkjy, pexamid, jgdm
    });
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

  nav(e){
    var that = this;
    console.log(e);
    var idcard = e.currentTarget.dataset.idcard;
    console.log(idcard);
    var to = that.data.to;
    if(to){
      wx.navigateTo({
        url: '../' + to + '/' + to + '?idcard=' + idcard
      });
    }
  },
  get_detail(e){
      var that = this;
      console.log(e);
      var tjxmfl = e.currentTarget.dataset.tjxmfl;
      console.log(tjxmfl);
      var this_list = [];
      var list = that.data.list;
      for(let i = 0;i < list.length;i++){
          if(list[i].tjxmfl == tjxmfl){
              this_list.push(list[i]);
          }
      }
      wx.setStorageSync("heath_list", this_list);
      wx.navigateTo({
          url: '../exam_subject_detail/exam_subject_detail'
      });
  }
});
function get_list(that) {
    var pexamid = that.data.pexamid;
    var jgdm = that.data.jgdm;

    var data = {
        pexamid, jgdm
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/Gettjbgxq',
        method : 'POST',
        data,
        success(res) {
            wx.hideLoading();
            console.log(res);
            var ReturnCode = res.data.ReturnCode;
            if(ReturnCode == 0){
                let info_list = [];
                let list = res.data.data2;  //list作为一个临时放整体数据的地方
                console.log(list);
                for(let i = 0;i < list.length;i++){
                    info_list.push(list[i].tjxmfl);
                }
                info_list = Array.from(new Set(info_list)); //对info_list进行去重
                console.log(info_list);
                that.setData({
                    info_list, list
                });
            }
        },
        fail(res){
            console.log(res);
        }
    });

}
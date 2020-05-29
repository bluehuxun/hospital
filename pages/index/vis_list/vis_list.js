const ratio = wx.getSystemInfoSync().windowWidth / 750;
const app = getApp();
Page({
  
    data: {
        img_url : app.global_data.img_url,
        idcard_list : {},
        dataa:'',
        preid:'',                           //给按钮设置列表表示id
        busi_name: "B100013",               //从这向下是取消接口要传的数据
        username: "3304240003",
        hosnum: "",
        preid: "",
        orderid: "",
        medid: "",
        idnum: "",
        hzmc: "",                           //从这向上是取消接口传的数据
    },
    onLoad(query){
        let that = this;
        get_person_list(that);
    },
    //如果是预约的，就显示取消预约按钮，取消状态就显示取消预约
  btnclick:function(event) {
      let _this=this
      var idx = event.currentTarget.dataset.info;//获取当前列表的表示信息preid
      //获取本地存储的数据
      console.log(_this.data.list);
      let data={
        busi_name: "B100013",
        username: "",
        send_time: "",
        hosnum: _this.data.list[idx].hosnum,
        preid: _this.data.list[idx].preid,
        orderid: _this.data.list[idx].orderid,
        medid: "36C62D4F-5F62-E432-A43A-472667",
        idnum: "",
        hzmc: _this.data.list[idx].hzmc,
      }
      console.log(data);
      wx.showModal({
        title: '温馨提示',
        content: '您确定取消预约吗？',
        confirmColor: '#1abb85',
        success: function (res) {
          if (res.confirm) {
            //调用借口改变状态
            wx.request({
              url: app.global_data.ajax_url +  'platform/CancelReservation',
              method: 'post',
              data,
              success(resl) {
                console.log("这是取消预约返回的内容")
                console.log(resl)
                var code = resl.data.code;
                if (code == 0) {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 2000
                  });
                }else {
                  wx.showToast({
                    title: '取消失败',
                    icon: 'none',
                    duration: 2000
                  });
                }
              },
              fail(error){
                wx.showToast({
                  title: '取消失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            })
            setTimeout(function () {
              _this.setData({ pageIndex: 1, doctorArr: [] });//   重点
              _this.onLoad()//重点   重新执行下onLoad去获取当前的数据
            }, 2000)
            
          }
        }
      })
    }
});
function get_person_list(that) {
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
          console.log("获取预约记录",res)
            var code = res.data.code;
            if(code == 0){
                var list = res.data.data;
                let idcard_list = that.data.idcard_list;
                for(let i = 0;i < list.length;i++){
                    if(i == 0){
                        idcard_list.idcardone = list[i].idcard;
                    }
                    else if(i == 1){
                        idcard_list.idcardtwo = list[i].idcard;
                    }
                    else{
                        idcard_list.idcardthree = list[i].idcard;
                    }
                }
                that.setData({
                    list, idcard_list
                });
                console.log(that.data.list)
                get_info_list(that);
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
function get_info_list(that) {
    let idcard_list = that.data.idcard_list;
    var data = that.data.idcard_list;
    console.log(data,"获取预约挂号记录传递的参数")
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetMessage',
        // url: app.global_data.ajax_url + 'test/GetMessage',
        method : 'POST',
        data,
        success(res) {
            var code = res.data.code;
            console.log(res.data,"从后台传来的预约记录参数")
            if(code == 0){
                var list = res.data.data;
                for(var i = 0,len = list.length;i < len;i++){
                    console.log(list[i].month);
                    console.log(list[i].month.startsWith('0'));
                    if(list[i].month.startsWith('0')){
                        list[i].month = list[i].month.slice(1, 2);
                    }
                    console.log('list[i].month', list[i].month);
                }
                that.setData({
                    list
                });
              wx.setStorage({
                key: "key",
                data: list
              })
            };
            
        },
        fail(res){
            console.log(res);
        },
        complete(res){
            wx.hideLoading();
        }
    });

}
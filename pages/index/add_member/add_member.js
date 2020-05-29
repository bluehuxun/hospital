const window_h = wx.getSystemInfoSync().windowHeight;
const app = getApp();

Page({
  data : {
      family_relation : '',
      genders: ['男', '女'],
      gender_index: 0,
      name : '',
      id : '',
      phone : '',
      openid : '',
      to : '',
      from : '',
      img_url : app.global_data.img_url
  },
  onLoad(query){
      var that = this;
      var to = query.to;
      var from = query.from;
      that.setData({
          to, from
      });
      var openid = app.global_data.openid;

      if(!openid){
          wx.login({
              success: function (res) {
                  console.log(res);
                  if (res.code) {
                      var appid = 'wx0cdf5673fafc32c6';
                      var secret = 'b82fb7554ef792af856920547dce7e9e';
                      var js_code = res.code;
                      var url = app.global_data.ajax_url + 'GetOpenid?js_code=' + js_code;
                      // var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + js_code + '&grant_type=authorization_code';
                      //发起网络请求
                      wx.request({
                          url,
                          success(res) {
                              var openid = res.data.openid;
                              that.setData({
                                  openid
                              });
                              wx.setStorageSync("openid", openid);
                          },
                          fail(res){
                              console.log('fail', res)
                          },
                          complete(res){
                              console.log('complete', res)
                          }
                      })
                  } else {
                      console.log('登录失败！' + res.errMsg)
                  }
              }
          });
      }
      else{
          that.setData({
              openid
          });
      }
  },
  family_relation (e) {
    this.setData({
      family_relation: e.detail.value
    })
  },
  set_gender(e) {
    this.setData({
      gender_index: e.detail.value
    });
  },
  set_name(e) {
    this.setData({
      name: e.detail.value
    });
  },
  set_id(e) {
    this.setData({
      id: e.detail.value
    });
  },
  set_phone(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  save(){
    var that = this;
    var patname = that.data.name;
    var idcard = that.data.id;
    var phonecall = that.data.phone;
    console.log(patname, idcard, phonecall);
    var reg = /^1[3-9][0-9]\d{4,8}$/;
    var id_reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (patname == '') {
      wx.showModal({
        title: '',
        content: '请输入家属姓名',
        showCancel: false
      });
      return false;
    }
    if (idcard == '') {
      wx.showModal({
        title: '',
        content: '请输入身份证号',
        showCancel: false
      });
      return false;
    }
    if (!id_reg.test(idcard)){
      wx.showModal({
        title: '',
        content: '您输入的身份证号格式不正确',
        showCancel: false
      });
      return false;
    }
    if (phonecall == '') {
      wx.showModal({
        title: '',
        content: '请输入电话号码',
        showCancel: false
      });
      return false;
    }
    // if (!reg.test(phonecall)){
    //   wx.showModal({
    //     title: '',
    //     content: '您输入的电话号码格式不正确',
    //     showCancel: false
    //   });
    //   return false;
    // }

    wx.showLoading({
      title: '加载中...',
    });
    var openid = that.data.openid;
      var data = {
          openid,
          patname,
          "sex": "",
          idcard,
          "bloodtype": "",
          "rhbloodtype": "",
          "dateofbirth": "",
          "birthplace": "",
          "maritalstatus": "",
          "culturaldegree": "",
          "national": "",
          "nationality":"",
          "profession": "",
          "medicare": "",
          "medicarecode": "",
          "workdate": "",
          "registorg": "",
          "registorgname":"",
          "comments": "",
          "locationtype": "",
          "divisioncode": "",
          "post": "",
          "province": "",
          "city": "",
          "county": "",
          "township":"",
          "village": "",
          "laddress": "",
          "phonetype": "",
          "contacter": "",
          phonecall,
          "relation": "",
          "email": "",
          "idtype": "",
          "identifier": "",
          "iregistorg": "",
          "iregistorgname": "",
          "commentss":""
      };
      console.log(data,"增加的参数")
      wx.request({
          url: app.global_data.ajax_url + 'platform/registPerson',
          method : 'POST',
          data,
          success(res) {
              var message = res.data.message;
              var code = res.data.code;
              app.showModal(message);
              if(code == 0){
                
                  var idcard = data.idcard;
                  var phonecall = data.phonecall;
                  wx.setStorageSync("idcard", idcard);
                  wx.setStorageSync("patname", patname);
                  wx.setStorageSync("phonecall", phonecall);

                  let to = that.data.to;
                  if(to){
                      console.log('to == true', to, to == 'body_exam_report');
                      if(to == 'hospitals'){
                          wx.reLaunch({
                              url: '../' + to + '/' + to
                          });
                      }
                      else if(to == 'body_exam_report'){
                          wx.redirectTo({
                              url: '../sel_patient2/sel_patient2?to=body_exam_report'
                          });
                      }
                      else if(to == 'health_file'){
                          wx.redirectTo({
                              url: '../sel_patient2/sel_patient2?to=health_file'
                          });
                      }
                      else if(to == 'more_serve'){
                          wx.redirectTo({
                              url: '../sel_patient2/sel_patient2?to=more_serve'
                          });
                      }
                      else if(to == 'sel_patient'){
                          wx.reLaunch({
                              url: '../sel_patient/sel_patient'
                          });
                      }

                      else{
                          wx.navigateTo({
                              url: '../' + to + '/' + to + '?idcard=' + idcard + '&patname=' + patname
                          });
                      }
                  }
                  else{
                      console.log('to == false', to);
                      setTimeout(function () {
                          wx.navigateBack();
                      }, 2000);
                  }
              }
          },
          fail(res){
              app.showModal('fail', JSON.stringify(res));
              console.log(res);
          },
          complete(res){
              wx.hideLoading();
          }
      });
  }
});
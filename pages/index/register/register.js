const app = getApp();
// 新的auth
let authorization = '';
// let authorization = 'rEB/RC2gcuL3Sf/jGyMgVExHZWdhPTEyNTc4NDY5NTUmYj0maz1BS0lEMXZqUHRCU0R5REhCeFhSRU5LN2g1SEhxRFVadjMzcFAmZT0xNTQ3MzQ3MzkyJnQ9MTU0NDc1NTM5MiZyPTMyNzA2JmY9';

// let authorization = 'bBwFuMRct6ArmkiIpPsGWARz5tFhPTEyNTc4NDY5NTUmYj0maz1BS0lEMXZqUHRCU0R5REhCeFhSRU5LN2g1SEhxRFVadjMzcFAmZT0xNTQ3MDE0MzYxJnQ9MTU0NDQyMjM2MSZyPTIwMzUwJmY9';

let that;
// 原文链接：https://cloud.tencent.com/document/product/868/17579,https://cloud.tencent.com/document/product/868/17577
Page({
    data: {
        img_url : app.global_data.img_url,
        is_allowed : false, //是否被允许注册
        phone : '',
        pass : '',
        get_code_text : '获取验证码',
        btn_disabled : false,	//获取短信验证码的按钮是否禁用
        items: [
            {name: 'agree', value: 'true', checked : 'true'}
        ],
        agree : true,
        appid : '1257846955',   //腾讯云的appid，不是微信小程序的appid
        validate_data : '',
        idcard_number : '',
        idcard_name : '',
        compare_status : '',
        patname : '',
        agree_con_info_hidden : true,
        face_recog_lead_hidden : true
    },
    onLoad(query){
        that = this;
        let to = query.to;
        // get_img_msg(that);

        // get_lip_lang(that, authorization);

        get_authorization(that);
        var windowHeight = wx.getSystemInfoSync().windowHeight;
        that.setData({
            windowHeight, to
        });
    },
    close_pop(){
        let face_recog_lead_hidden = true;
        that.setData({
            face_recog_lead_hidden
        });
    },
    show_face_recog_lead(){
        let face_recog_lead_hidden = false;
        that.setData({
            face_recog_lead_hidden
        });
    },
    hide_agree_con_info(){
        let agree_con_info_hidden = true;
        that.setData({
            agree_con_info_hidden
        });
    },
    show_agree_con(){
        let agree_con_info_hidden = false;
        that.setData({
            agree_con_info_hidden
        });
    },
    shoot_video(){
        let that = this;
        let appid = that.data.appid;
        let validate_data = that.data.validate_data;
        let idcard_number = that.data.idcard_number;
        let idcard_name = that.data.idcard_name;
        // 选择文件
        wx.chooseVideo({
            sourceType: ['camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                console.log('res', res);
                let tempFilePath = res.tempFilePath;
                wx.showLoading({
                    title: '提交视频中...'
                });
                wx.uploadFile({
                    url : 'https://recognition.image.myqcloud.com/face/idcardlivedetectfour',
                    header : {
                        'content-type' : 'multipart/form-data',
                        authorization : that.data.authorization
                        // authorization : 'bBwFuMRct6ArmkiIpPsGWARz5tFhPTEyNTc4NDY5NTUmYj0maz1BS0lEMXZqUHRCU0R5REhCeFhSRU5LN2g1SEhxRFVadjMzcFAmZT0xNTQ3MDE0MzYxJnQ9MTU0NDQyMjM2MSZyPTIwMzUwJmY9'
                    },
                    name: 'video',
                    filePath : tempFilePath,
                    formData: {
                        appid, validate_data, idcard_number, idcard_name
                    },
                    success(res) {
                        console.log(res);
                        let live_status = JSON.parse(res.data).data.live_status;
                        let compare_status = JSON.parse(res.data).data.compare_status;
                        let sim = JSON.parse(res.data).data.sim;
                        if(compare_status == 0){
                            that.setData({
                                compare_status
                            });
                            app.showModal('识别成功');
                            return;
                        }
                        else{
                            if(sim < 70){
                                app.showModal('视频里的人和身份证上的头像不一致');
                                return;
                            }
                            else{
                                console.info('live_status', live_status);
                                if(live_status == -4016){
                                    app.showModal('自拍照解码失败');
                                    return;
                                }
                                else if(live_status == -5008){
                                    app.showModal('语音识别失败，视频里的人读错数字');
                                    return;
                                }
                                else{
                                    app.showModal('识别失败');
                                    return;
                                }
                            }
                        }
                    },
                    fail(res){
                        console.log(res);
                        let errMsg = res.errMsg;
                        app.showModal(errMsg);
                    },
                    complete(res){
                        wx.hideLoading();
                    }
                });

            }
        });
    },
    get_idcard_number(e){
        let that = this;
        let idcard_number = e.detail.value;
        that.setData({
            idcard_number
        });
    },
    get_idcard_name(e){
        let that = this;
        let idcard_name = e.detail.value;
        that.setData({
            idcard_name
        });
    },
    get_code(){
        var that = this;
        var phone = that.data.phone;
        var phone_reg = /^1\d{10}$/;
        console.log(phone);
        if(!phone){
            app.showModal('请输入手机号码');
            return;
        }
        if(!phone_reg.test(phone)){
            app.showModal('您输入的手机号码格式不正确，请重新输入');
            return;
        }
        var num = 60;
        var data = {
            requesttype : '101',
            phone : that.data.phone,
            type : '1'
        };
        var time = setInterval(function(){
            num--;
            if(num > 0){
                var get_code_text = num + '秒后再获取';
                that.setData({
                    get_code_text : get_code_text,
                    btn_disabled : true
                });

            }
            else{
                clearInterval(time);
                that.setData({
                    get_code_text : '再次获取',
                    btn_disabled : false
                });
            }

        }, 1000);
    },
    get_phone(e){
      var phone = e.detail.value;
      this.setData({
          phone
      });
    },
    get_pass(e){
        var pass = e.detail.value;
        this.setData({
            pass
        });
    },
    submit(){
        var that = this;


        let idcard = that.data.idcard_number;
        let patname = that.data.idcard_name;
        var phonecall = that.data.phone;
        var pass = that.data.pass;
        var agree = that.data.agree;
        var compare_status = that.data.compare_status;
        if(!that.data.is_allowed){
            app.showModal('人脸识别未通过，请通过人脸识别以后再注册');
            return;
        }
        if(idcard == ''){
            app.showModal('请输入身份证号码');
            return;
        }
        if(patname == ''){
            app.showModal('请输入姓名');
            return;
        }
        if(!phonecall){
            app.showModal('请输入手机号码');
            return;
        }
        if(!agree){
            app.showModal('请先同意《用户服务协议》');
            return;
        }

        var openid = app.global_data.openid;

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
                        console.log('to == true', to);
                        if(to == 'hospitals'){
                            wx.reLaunch({
                                url: '../../index/hospitals/hospitals'
                            });
                        }
                        else if(to == 'report_search'){
                            wx.navigateTo({
                                url : '../../index/sel_patient2/sel_patient2?to=report_search'
                            });
                        }
                        else if(to == 'body_exam_report'){
                            wx.navigateTo({
                                url : '../../index/sel_patient2/sel_patient2?to=body_exam_report'
                            });
                        }
                        else if(to == 'health_file'){
                            wx.navigateTo({
                                url: '../../index/sel_patient2/sel_patient2?to=health_file'
                            });
                        }
                        else if(to == 'more_serve'){
                            wx.navigateTo({
                                url: '../../index/sel_patient2/sel_patient2?to=more_serve'
                            });
                        }
                        else if(to == 'sel_patient'){
                            wx.reLaunch({
                                url: '../../index/sel_patient/sel_patient'
                            });
                        }
                        else{
                            wx.navigateTo({
                                url: '../../index/' + to + '/' + to + '?idcard=' + idcard + '&patname=' + patname
                            });
                        }
                    }
                    else{
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
    },
    checkboxChange: function(e) {
        var val_len = e.detail.value.length;
        console.log(Boolean(val_len));
        var agree = Boolean(val_len);
        this.setData({
            agree
        });
    },
    upload_photo(){
        let appid = that.data.appid;
        let idcard_number = that.data.idcard_number;
        if(!idcard_number){
            app.showModal('请输入身份证号码');
            return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                console.log('chooseImage res', res);
                // tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths[0];
                wx.showLoading({
                    title: '上传图片中...'
                });
                wx.uploadFile({
                    url : 'https://recognition.image.myqcloud.com/face/detect',
                    header : {
                        'content-type' : 'multipart/form-data',
                        authorization : that.data.authorization
                    },
                    name: 'image',
                    filePath : tempFilePaths,
                    formData: {
                        appid
                    },
                    success(res) {
                        console.log('success', res);
                        let data = JSON.parse(res.data);
                        let code = data.code;
                        if(code != 0){
                            if(code == -1101){
                                app.showModal('人脸检测失败');
                                return;
                            }
                            else{
                                app.showModal('人脸检测失败');
                                return;
                            }
                        }
                        let idcard_age = app.GetAge(idcard_number);
                        let age = data.data.face[0].age;
                        if(idcard_age - age > 10 || idcard_age - age < -10){
                            app.showModal('上传照片不是本人，请重新上传');
                            return;
                        }

                        let idcard_gender = app.Getsex(idcard_number);
                        let gender = data.data.face[0].gender;  // [0(female)~100(male)]
                        if((idcard_gender == 'M' && gender < 50) || idcard_gender == 'F' && gender > 50){
                            app.showModal('上传照片不是本人，请重新上传');
                            return;
                        }
                        wx.showToast({
                            title: '审核通过',
                            icon: 'success',
                            duration: 2000
                        });
                        let is_allowed = true;
                        that.setData({
                            is_allowed
                        });
                    },
                    fail(res){
                        let errMsg = res.errMsg;
                        app.showModal(errMsg);
                    },
                    complete(res){
                        wx.hideLoading();
                    }
                });
            }
        })
    }
});

//获取authorization
function get_authorization(that){
// 获取签名
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetSign',
        method : 'POST',
        success(res) {
            let authorization = res.data;
            that.setData({
                authorization
            });
            console.log('authorization', authorization);
            // 上线前，把下面这句话删除
            // authorization = '99AFOZnRyq3brBBXZR0aXmijwwRhPTEyNTc4NDY5NTUmYj0maz1BS0lEMXZqUHRCU0R5REhCeFhSRU5LN2g1SEhxRFVadjMzcFAmZT0xNTQ3MzQ3NzExJnQ9MTU0NDc1NTcxMSZyPTIxMDc5JmY9';
            // get_lip_lang(that, authorization);
        },
        fail(res){
            console.log(res);
        }
    });
}

// 获取唇语验证码
function get_lip_lang(that, authorization) {
    let appid = that.data.appid;
    let data = {
        appid
    };
    data = JSON.stringify(data);
    console.log('data', data, 'authorization', authorization);

    // 获取唇语验证码
    wx.request({
        url : 'https://recognition.image.myqcloud.com/face/livegetfour',
        method : 'POST',
        header : {
            'content-type' : 'application/json',
            authorization
        },
        data,
        success(res) {
            let code = res.data.code;
            if(code == 9){
                get_authorization();    //获取authorization
                get_lip_lang(that); //再次请求获取唇语验证码的接口
                return;
            }
            console.log(res);
            let validate_data = res.data.data.validate_data;
            that.setData({
                validate_data
            });
            let video = that.data.video_src;
            console.log(video);
            // let video = 'video';
            let idcard_number = that.data.idcard_number;
            let idcard_name = that.data.idcard_name;
            let filename = that.data.video_src;
            that.setData({
                validate_data
            });
        },
        fail(res){
            console.log(res);
        }
    });
}

// // 获取图片信息，
// function get_img_msg(that) {
//     let appid = '1257846955';
//     let url = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2618361313,4270213802&fm=27&gp=0.jpg';
//     let data = {
//         appid, url
//     };
//     data = JSON.stringify(data);
//
//     // 获取唇语验证码
//     wx.request({
//         url : 'https://recognition.image.myqcloud.com/face/detect',
//         method : 'POST',
//         header : {
//             'content-type' : 'application/json',
//             authorization : 'bBwFuMRct6ArmkiIpPsGWARz5tFhPTEyNTc4NDY5NTUmYj0maz1BS0lEMXZqUHRCU0R5REhCeFhSRU5LN2g1SEhxRFVadjMzcFAmZT0xNTQ3MDE0MzYxJnQ9MTU0NDQyMjM2MSZyPTIwMzUwJmY9'
//         },
//         data,
//         success(res) {
//             console.log('res', res);
//         },
//         fail(res){
//             console.log(res);
//         }
//     });
// }




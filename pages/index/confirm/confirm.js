const app = getApp();
Page({
    data: {
        index: 0,
        list: [],
        img_url: app.global_data.img_url
    },
    onLoad(query) {
        let that = this;
        console.log(query)
        let patname = query.patname;
        let schtime = query.schtime;
        let deptid = query.deptid;
        let medino = query.medino;
        let regdate = query.regdate;
        let departname = query.departname;
        let regtime = query.regtime;
        let resno = query.resno;
        let schid = query.schid;
        let hosnum = query.hosnum;
        let username = query.username;
        that.setData({
            medino, departname, regtime, resno, regdate, schid, hosnum, username, schtime, deptid, patname
        });

        // 上线前要打开下面这句话
        get_list(that);
    },
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        });
    },
    confirm(e) {
        let that = this;
        // 上线前，把下面这段代码打开注释
        wx.showLoading({
            title: '提交中...'
        });
console.log(that.data.patname)
        let device_no = 'HY001';
        let device_name = 'HY001';
        let username = that.data.username;
        let busi_name = 'B100013';
        let send_time = '';
        let hosnum = that.data.hosnum;
        let schid = that.data.schid;
        let regtime = that.data.regdate;
        let regnotype = '1';
        let schtime = that.data.schtime;
        let list = that.data.list;
        let index = that.data.index;
        let idnum = list[index].idcard;
        let deptid = that.data.deptid;
        let medino = that.data.medino;
        let docno = medino;
        let hzmc = list[index].patname;
        let resno = that.data.resno;
        let phonenum = list[index].phonecall;
        let regdate = that.data.regtime
        let jtzz = '';

        var data = {
            device_no, device_name, username, busi_name, send_time, hosnum, schid, regtime, regnotype, schtime, idnum, deptid, medino, docno, hzmc, resno, phonenum, jtzz, regdate
        };
        data = JSON.stringify(data);
        console.log('confirm data', data);

        wx.request({
            url: app.global_data.ajax_url + 'platform/Insert_message',
            method: 'POST',
            data,
            success(res) {
                console.log(res);
                var code = res.data.code;
                var message = res.data.message;
                if (code == 0) {
                    // wx.showToast({
                    //     title: message,
                    //     icon: 'success',
                    //     duration: 2000
                    // });
                    // setTimeout(function () {
                    //     wx.navigateTo({
                    //         url: '../register_suc/register_suc'
                    //     });
                    // }, 2000);
                    var retmsg = res.data.data.retmsg;
                    app.showModal(retmsg);
                    let retcode = res.data.data.retcode;
                    if (retcode == '001') {
                        // wx.navigateTo({
                        setTimeout(function () {
                            wx.redirectTo({
                                url: '../vis_list/vis_list'
                            });
                        }, 2000);
                        // wx.navigateTo({
                        //     url: '../register_suc/register_suc'
                        // });
                    }
                }
                else {
                    var message = res.data.message;
                    app.showModal(message);
                }
            },
            fail(res) {
                console.log(res);
            },
            complete() {
                wx.hideLoading();
            }
        });
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
        method: 'POST',
        data,
        success(res) {
            wx.hideLoading();
            console.log(res);
            var code = res.data.code;
            if (code == 0) {
                var list = res.data.data;
                that.setData({
                    list
                });
                console.log(list)
                let patname = that.data.patname;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].patname == patname) {
                        let index = i;
                        that.setData({
                            index
                        });
                        break;
                    }
                }
            }
        },
        fail(res) {
            console.log(res);
        }
    });

}
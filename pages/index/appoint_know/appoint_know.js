var app = getApp();
let that;
let global_query;
Page({
    data: {
        window_h: wx.getSystemInfoSync().windowHeight,
        username: '',
        hosnum: '',
        img_url: app.global_data.img_url,
        name: '', //用户输入的内容
        appoint_info_wrap_hidden: false,
        hos: ''
    },
    onLoad(query) {
        that = this;
        global_query = query;
        let hos = global_query.hos;
        let patname = global_query.patname;
        let win_h = wx.getSystemInfoSync().windowHeight;
        that.setData({
            hos, win_h, patname
        });
    },
    set_name(e) {
        let that = this;
        let name = e.detail.value;
        that.setData({
            name
        });
        wx.showLoading({
            title: '加载中...'
        });
        get_list(that);
    },
    get_detail(e) {
        let that = this;
        let deptid = e.currentTarget.dataset.deptid;
        let hos = that.data.hos;
        wx.navigateTo({
            url: '../subject_info/subject_info?deptid=' + deptid + '&hos=' + hos
        });
    },
    confirm() {
        let hos = that.data.hos;
        let patname = that.data.patname;
        wx.navigateTo({
            url: '../subject/subject?hos=' + hos + '&patname=' + patname
        });
    }
});
function get_list(that) {
    var username = that.data.username;
    var hosnum = that.data.hosnum;
    var regTime = '';
    var regnotype = '1';
    var name = that.data.name;
    var data = {
        hosnum, regTime, regnotype, username, name
    };
    data = JSON.stringify(data);
    let url = app.global_data.ajax_url + 'platform/GetDeptInfoByName';
    // let url = app.global_data.ajax_url + 'test/GetDeptInfoByName';

    wx.request({
        url,
        method: 'POST',
        data,
        success(res) {
            console.log(res);
            let code = res.data.code;
            if (code == 0) {
                console.log('code', code);
                let list = res.data.data;
                console.log('list', list);
                that.setData({
                    list
                });
            }
            else {
                let message = res.data.message;
                app.showModal(message);
            }

        },
        fail(res) {
            let message = res.data.message;
            app.showModal(message);
            console.log(res);
        },
        complete(res) {
            wx.hideLoading();
        }
    });
}
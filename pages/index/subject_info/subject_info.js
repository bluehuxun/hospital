const app = getApp();
Page({
    data: {
        img_url: app.global_data.img_url,
        window_h: wx.getSystemInfoSync().windowHeight,
        time_list: ['上午', '下午'],
        time_index: 0,
        contain_today: [
            { name: '', value: '' },
        ],
        active_date: 0,
        sel_subject: 'internal_medicine',
        username: '',
        hosnum: '',
        list: [],
        list2: [],
        list3: [],
        regtime: '',
        days: [],
        deptid: ''
    },
    onLoad(query) {
        console.log(query);
        var that = this;
        // wx.showLoading({
        //     title : '加载中...'
        // });
        let hos = query.hos;
        let patname = query.patname;
        let username, hosnum;
        if (hos == 1) {
            username = '3304240002';
            hosnum = '47103013433042411A1001';
        }
        else if (hos == 2) {
            username = '3304240003';
            hosnum = '47103012633042411A2101';
        }
        else if (hos == 3) {
            username = '3304240004';
            hosnum = '47103010X33042411G1001';
        }
        else if (hos == 4) {
            username = '3304240005';
            hosnum = '57774875033042411A5111';
        }
        else if (hos == 5) {
            username = '3304240006';
            hosnum = '30773817333042411A7101';

        } else {
            username = '3304240007';
            hosnum = '47103005433042411B1001';
        }

        var deptid = query.deptid;
        that.setData({
            username, hosnum, deptid, patname
        });
        let window_h = wx.getSystemInfoSync().windowHeight;
        this.setData({
            small_subject_h: window_h - 60
        });

        function getDay(day) {
            var today = new Date();
            console.log(today);
            var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            var tYear = today.getFullYear();
            var tMonth = today.getMonth();
            var tDate = today.getDate();
            var week = today.getDay();
            tMonth = doHandleMonth(tMonth + 1);
            tDate = doHandleMonth(tDate);
            console.log('tYear', tYear, tMonth, tDate)
            if (day == 0) {
                return {
                    is_today: true,
                    tDate: tDate,
                    week: week,
                    date: tYear + '-' + tMonth + '-' + tDate
                }
            }
            else {
                return {
                    is_today: false,
                    tDate: tDate,
                    week: week,
                    date: tYear + '-' + tMonth + '-' + tDate
                }
            }

        }
        function doHandleMonth(month) {
            var m = month;
            if (month.toString().length == 1) {
                m = "0" + month;
            }
            return m;
        }
        for (var i = 1; i < 8; i++) {
            that.data.days.push({
                day: getDay(i)
            });
        }
        new Date().getHours() < 8 && that.data.days.pop()
        that.setData({
            days: that.data.days
        });
        console.log(that.data.days);

        get_list(that);
    },
    set_subject(e) {
        console.log(e.target.dataset.subject);
        this.setData({
            sel_subject: e.target.dataset.subject
        });
    },
    change_date(e) {
        var that = this;
        var date = e.currentTarget.dataset.date;
        var regtime = e.currentTarget.dataset.regtime;
        console.log('regtime', regtime);
        that.setData({
            active_date: date,
            regtime
        });
        get_list(that);
    },
    change_time(e) {
        this.setData({
            time_index: e.detail.value
        });
    },
    get_detail(e) {
        let deptid = e.currentTarget.dataset.deptid;
        wx.navigateTo({
            url: '../subject_info_subject_info?deptid=' + deptid
        });
    },
    to_list(e) {
        let that = this;
        let regtime = that.data.regtime;
        let patname = that.data.patname;
        if (regtime == '') {
            regtime = that.data.days[0].day.date;
        }
        let departname = e.currentTarget.dataset.departname;
        console.log('departname', departname);
        let deptid = e.currentTarget.dataset.deptid;
        let schtime = e.currentTarget.dataset.schtime;
        let regnotype = '1';
        let medino = e.currentTarget.dataset.medino;
        if (!medino) {
            console.log('medino', medino);
            medino = '';
        }
        let hosnum = that.data.hosnum;
        let username = that.data.username;
        wx.navigateTo({
            url: '../nums/nums?hosnum=' + hosnum + '&regtime=' + regtime + '&schtime=' + schtime + '&regnotype=' + regnotype + '&deptid=' + deptid + '&medino=' + medino + '&username=' + username + '&departname=' + departname + '&patname=' + patname
        });
    }
});
function get_list(that) {
    var username = that.data.username;
    var hosnum = that.data.hosnum;
    var regtime = that.data.regtime;
    if (regtime == '') {
        regtime = that.data.days[0].day.date;
        console.log(regtime);
    }
    var regnotype = '1';

    var deptid = that.data.deptid;
    let data = {
        username, hosnum, regtime, regnotype, deptid
    };
    console.log(data);
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/GetMedInfo',
        method: 'POST',
        data,
        success(res) {
            // var res = {
            //     data : {"code":"0","data":[{"regtime":"2018-10-19","schtime":"2","medino":"1066","medname":"李卫珍","deptid":"1001030101","departname":"普通妇科门诊","resourcenum":10},{"regtime":"2018-10-19","schtime":"2","medino":"1066","medname":"李卫珍","deptid":"1001030101","departname":"普通妇科门诊","resourcenum":10},{"regtime":"2018-10-19","schtime":"2","deptid":"1001030101","departname":"普通妇科门诊","resourcenum":120},{"regtime":"2018-10-19","schtime":"1","medino":"1093","medname":"赵宏侠","deptid":"1001030101","departname":"普通妇科门诊","resourcenum":10},{"regtime":"2018-10-19","schtime":"1","deptid":"1001030101","departname":"普通妇科门诊","resourcenum":120}],"message":"成功"}
            //
            // };

            console.log(res);
            let code = res.data.code;
            if (code == 0) {
                var list = res.data.data;

                let list2 = []; //放普通号的数组
                let list3 = []; //放专家号的数组
                for (let i = 0; i < list.length; i++) {
                    console.log(list[i].medino);
                    if (list[i].medino) {
                        list3.push(list[i]);
                    }
                    else {
                        list2.push(list[i]);
                    }
                }
                console.log('list2', list2);
                console.log('list3', list3);

                that.setData({
                    list, list2, list3
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
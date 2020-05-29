const app = getApp();
Page({
    data : {
        img_url : app.global_data.img_url,
        idcard : '',
        patname : ''
    },
    onLoad(query){
        var that = this;
        var idcard = query.idcard;
        var patname = query.patname;
        that.setData({
            idcard, patname
        });
    },
    to_body_exam_report(e){
        var that = this;
        var idcard = that.data.idcard;
        var patname = that.data.patname;
        wx.navigateTo({
            url : '../body_exam_report/body_exam_report?idcard=' + idcard + '&patname=' + patname
        });
    },
    to_test_report(e){
        var that = this;
        var idcard = that.data.idcard;
        var patname = that.data.patname;
        wx.navigateTo({
            url : '../test_report/test_report?idcard=' + idcard + '&patname=' + patname
        });
    },
});
var app = getApp();
Page({
    data : {
        img_url : app.global_data.img_url,
        jybgmc : ''
    },
    onLoad(query) {
        var that = this;
        console.log(query);
        var patname  = wx.getStorageSync('patname');
        var reportno = query.reportno;
        var reporttype = query.reporttype;
        var jgdm = query.jgdm;
        var assaydate = query.assaydate;
        that.setData({
            patname, reportno, reporttype, jgdm, assaydate
        });
        get_list(that);
    },
});
function get_list(that) {
    var reportno = that.data.reportno;
    var reporttype = that.data.reporttype;
    var jgdm = that.data.jgdm;
    var data = {
        reportno, jgdm
    };
    data = JSON.stringify(data);
    if(reporttype == 1){
        wx.request({
            url: app.global_data.ajax_url + 'platform/Getjybg',
            method : 'POST',
            data,
            success(res) {
                console.log('report_detail', res);
                var ReturnCode = res.data.ReturnCode;
                if(ReturnCode == 0){
                    var jybgmc = res.data.ReturnInfo[0].jybgmc;
                    var jcr = res.data.ReturnInfo[0].jcr;
                    var jgmc = res.data.ReturnInfo[0].jgmc;

                    var list = res.data.data;
                    console.log('list', list);
                    that.setData({
                        jybgmc, jcr, jgmc, list
                    });
                }
                else{
                    var ReturnInfo = res.data.ReturnInfo;
                    that.setData({
                        ReturnInfo
                    });
                }
            },
            fail(res){
                console.log(res);
            }
        });
    }
    else{
        wx.request({
            url: app.global_data.ajax_url + 'platform/Getjcbg',
            method : 'POST',
            data,
            success(res) {
                console.log('report_detail', res);
                var ReturnCode = res.data.ReturnCode;
                if(ReturnCode == 0){
                    var jybgmc = res.data.ReturnInfo[0].jybgmc;
                    var jcr = res.data.ReturnInfo[0].jcr;
                    var jgmc = res.data.ReturnInfo[0].jgmc;

                    var list = res.data.data;
                    console.log('list', list);
                    that.setData({
                        jybgmc, jcr, jgmc, list
                    });
                }
                else{
                    var ReturnInfo = res.data.ReturnInfo;
                    that.setData({
                        ReturnInfo
                    });
                }
            },
            fail(res){
                console.log(res);
            }
        });
    }

}
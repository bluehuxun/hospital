const app = getApp();
Page({
    data: {
        img_url : app.global_data.img_url,
        idcard : ''
    },
    onLoad(){
        var that = this;

        // 上线前要删除,以后要从storage里获取idcard
        // var idcard = '330424199709022814';
        var idcard = wx.getStorageSync('idcard');
        if(idcard){
            var patname = wx.getStorageSync('patname');
            var phonecall = wx.getStorageSync('phonecall');
            that.setData({
                idcard, patname, phonecall
            });
            console.log(idcard);
        }



        // wx.request({
        //     url: app.global_data.ajax_url + 'platform/getPersonInfoByIdCard',
        //     method : 'POST',
        //     dataType : 'json',
        //     header: {
        //         'Content-Type': 'application/json'
        //     },
        //     data : {
        //         idcard
        //     },
        //     success: function(res) {
        //         console.log(res);
        //         var patname = res.data[0].patname;
        //         var phonecall = res.data[0].phonecall;
        //         var idcard = res.data[0].idcard;
        //         that.setData({
        //             patname, phonecall, idcard
        //         });
        //     },
        //     fail(res){
        //         console.log('fail', res);
        //     }
        // });
    }
});
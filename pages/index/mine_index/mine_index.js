const app = getApp();
Page({
    data: {
        img_url : app.global_data.img_url,
        idcard : ''
    },
    onLoad(){
        var that = this;
        var idcard = wx.getStorageSync('idcard');
        var patname = wx.getStorageSync('patname');
        var show_idcard;
        show_idcard = idcard.substring(0, 1) + '**************' + idcard.substring(idcard.length - 1, idcard.length);
        console.log(idcard.substring(0, 1));
        console.log(idcard.substring(1, idcard.length - 1));
        console.log(idcard.substring(idcard.length - 1, idcard.length));
        console.log(idcard);
        console.log(show_idcard);
        that.setData({
            idcard, patname, show_idcard
        });
    },
    exit(){
        wx.showModal({
            title: '温馨提示',
            content: '您确定退出吗？',
            confirmColor : '#1abb85',
            success: function(res) {
                if (res.confirm) {
                    wx.clearStorage();
                    wx.showToast({
                        title: '退出成功',
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        })
    }
});
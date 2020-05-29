const app = getApp();
let flag = 0;
let that;
Page({
    data: {
        img_url : app.global_data.img_url,
        no_online : app.no_online
    },
    onLoad(query){
        that = this;
        let idcard = query.idcard;
        that.setData({
            idcard
        });
    },
    to_diabete_file(e){
       
        let sick = e.currentTarget.dataset.sick;
        let idcard = that.data.idcard;
        console.info(""+sick+"idcard"+idcard);
        wx.navigateTo({
            url: '../diabete_file/diabete_file?idcard=' + idcard + '&sick=' + sick
        });
    },
    to_fb_file(e){
       
        let sick = e.currentTarget.dataset.sick;
        let idcard = that.data.idcard;
        console.info(""+sick+"idcard"+idcard);
        wx.navigateTo({
            url: '../fb_file/fb_file?idcard=' + idcard + '&sick=' + sick
        });
    },
    to_eb_file(e){
       
        let sick = e.currentTarget.dataset.sick;
        let idcard = that.data.idcard;
        console.info(""+sick+"idcard"+idcard);
        wx.navigateTo({
            url: '../eb_file/eb_file?idcard=' + idcard + '&sick=' + sick
        });
    },
    to_zytzbs_file(e){
       
        let sick = e.currentTarget.dataset.sick;
        let idcard = that.data.idcard;
        console.info(""+sick+"idcard"+idcard);
        wx.navigateTo({
            url: '../zytzbs_file/zytzbs_file?idcard=' + idcard + '&sick=' + sick
        });
    },
    
    
    no_online(e){
        app.no_online();
    },
    to_health_file(){
        let idcard = that.data.idcard;
        wx.navigateTo({
            url: '../health_file/health_file?idcard=' + idcard
        });
    }
});
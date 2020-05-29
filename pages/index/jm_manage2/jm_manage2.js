const app=getApp();
Page({
  data : {
    img_url : app.global_data.img_url,
    window_h : 0
  },
  onLoad(query){
	  var that = this;
      console.log(query);
      var szzbh = query.szzbh;
	  that.setData({
          szzbh
      });
	  get_list(that);
  },
  
  
	  
  setValue: function (e) {
	    var szzbh = e.detail.value;
	    current_e=e;
	    this.setData({
	      szzbh
	    });
	    
	  },  
		  
		  confirm:function(e){	    
			    var szzbh = current_e.detail.value;	
			    
			    wx.navigateTo({
			        url: '../jm_manage2/jm_manage2?szzbh=' + szzbh 
			    });
			  },

});

function get_list(that) {
    var idcard = that.options.szzbh;
    var data = {
        idcard
    };
    data = JSON.stringify(data);
    wx.request({
        url: app.global_data.ajax_url + 'platform/Jmxx',
        method : 'POST',
        data,
        success(res) {
            console.log(res);
            var ReturnCode = res.data.ReturnCode;
            if(ReturnCode == 0){
                var list = res.data.data;
                that.setData({
                    list
                });
            }
            else{
                var ReturnInfo = res.data.ReturnInfo;
                app.showModal(ReturnInfo);
            }
        },
        fail(res){
            console.log(res);
        }
    });

}


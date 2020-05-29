const app = getApp();
let that;
var current_e1;
var current_e2;
var current_e3;
let idcard;

Page({
    data : {
        img_url : app.global_data.img_url,
        patient_array: ['刘叶青', '刘叶青2'],
        patient_index: 0,
    },
    onLoad(query){
        wx.showLoading({
            title: '加载中...',
        });
        that = this;
        idcard = query.idcard;
        get_list(that, idcard);
    },
    setValue1: function (e) {
	    var dhhm = e.detail.value;
	    current_e1=e;
	    this.setData({
	      dhhm
	    });
	    
	  }, 
	  setValue2: function (e) {
		    var jtdz = e.detail.value;
		    current_e2=e;
		    this.setData({
		     jtdz
		    });
		    
		  }, 
		  setValue3: function (e) {
			    var xxdz = e.detail.value;
			    current_e3=e;
			    this.setData({
			      xxdz
			    });
			    
			  }, 
			 
		confirm:function(e){	    
			 var dhhm = "";
			
			 if(current_e1 != undefined){
			    dhhm=current_e1.detail.value;
			 };
			 var jtdz ="";
			 if(current_e2 != undefined){
				    jtdz= current_e2.detail.value;
				 };
			 var xxdz = "";
			 if(current_e3 != undefined){
				    xxdz=current_e3.detail.value;
				 };
			var data={dhhm:dhhm,jtdz:jtdz,xxdz:xxdz,idcard:idcard};
		      wx.request({
		        url: app.global_data.ajax_url + 'platform/GDUpdate' ,
		        method:'post',
                data,
                success(res) {
                  //  var success={title:"修改成功",icon:"succes"};
                    wx.showToast({
                      title: '修改成功',
                    });
                    
                }
		      });
			},
});

			  
function get_list(that, idcard){
    wx.request({
        url: app.global_data.ajax_url + 'platform/HYServer?requesttype=1001&zjhm=' + idcard,
        success(res) {
            wx.hideLoading();
            let stateCode = res.data.stateCode;
            let errorMsg = res.data.errorMsg;
            let list = res.data.data;
            that.setData({
                list
            });
            if(stateCode == 0){
                let daGrxx = res.data.data.daGrxx;
                let gmsList = res.data.data.gmsList;
                let jbsList = res.data.data.jbsList;
                let jzjbsList = res.data.data.jzjbsList;
                let sssList = res.data.data.sssList;
                let sxsList = res.data.data.sxsList;
                let wssList = res.data.data.wssList;
                let zysList = res.data.data.zysList;
                that.setData({
                    daGrxx, gmsList, jbsList, jzjbsList, sssList, sxsList, wssList, zysList
                });
            }
            else{
                app.showModal(errorMsg);
            }
        },
        fail(res){
            console.log(res);
        }
    });
}
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img_url : app.global_data.img_url,
      doctor_info_display : "-webkit-box",
	  show_all_text : '展开',
	  
	  good_info_display : "-webkit-box",
	  show_all_good_text : '展开',
  },
  show_all(){
	  var doctor_info_display = this.data.doctor_info_display;
	  if(doctor_info_display == '-webkit-box'){
		  this.setData({
			  doctor_info_display : "block",
			  show_all_text : '收起'
		  });
	  }
	  else{
		  this.setData({
			  doctor_info_display : "-webkit-box",
			  show_all_text : '展开'
		  });
	  }
  },
  show_all_good(){
	  var good_info_display = this.data.good_info_display;
	  if(good_info_display == '-webkit-box'){
		  this.setData({
			  good_info_display : "block",
			  show_all_good_text : '收起'
		  });
	  }
	  else{
		  this.setData({
			  good_info_display : "-webkit-box",
			  show_all_good_text : '展开'
		  });
	  }
  }
})
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img_url : app.global_data.img_url,
      hospital_intro_display : "-webkit-box",
	  show_all_intro_text : '展开',
		subject_display : "-webkit-box",
	  show_all_subject_text : '展开',
    hospital_intro_h : '140rpx'
  },
  show_all(){
	  var hospital_intro_display = this.data.hospital_intro_display;
	  if(hospital_intro_display == '-webkit-box'){
		  this.setData({
			  hospital_intro_display : "block",
			  show_all_intro_text : '收起',
        hospital_intro_h : 'auto'
      });
	  }
	  else{
		  this.setData({
			  hospital_intro_display : "-webkit-box",
			  show_all_intro_text : '展开',
        hospital_intro_h : '140rpx'
      });
	  }
  },
  show_subject(){
	  var subject_display = this.data.subject_display;
	  if(subject_display == '-webkit-box'){
		  this.setData({
				subject_display : "block",
				show_all_subject_text : '收起',
        hospital_intro_h : 'auto'
		  });
	  }
	  else{
		  this.setData({
				subject_display : "-webkit-box",
				show_all_subject_text : '展开',
        hospital_intro_h : '140rpx'
		  });
	  }
  },
  makePhoneCall() {
      wx.makePhoneCall({
          phoneNumber: '0793-86962038' //仅为示例，并非真实的电话号码
      });
  },
});
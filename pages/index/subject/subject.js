var app = getApp();
let that;
Page({
	data: {
		window_h: wx.getSystemInfoSync().windowHeight,
		username: '',
		hosnum: '',
		img_url: app.global_data.img_url,
		name: '', //用户输入的内容
		appoint_info_wrap_hidden: false
	},
	onLoad(query) {
		that = this;
		console.log("query:", query)
		wx.showLoading({
			title: '加载中...'
		});
		let hos = query.hos;
		let patname = query.patname;
		let username, hosnum;
		switch (hos) {
			case '1':
				username = '3304240002';
				hosnum = '47103013433042411A1001';
				break;
			case '2':
				username = '3304240003';
				hosnum = '47103012633042411A2101';
				break;
			case '3':
				username = '3304240004';
				hosnum = '47103010X33042411G1001';
				break;
			case '4':
				username = '3304240005';
				hosnum = '57774875033042411A5111';
				break;
			case '5':
				username = '3304240006';
				hosnum = '30773817333042411A7101';
				break;
			case '6':
				username = '3304240007';
				hosnum = '47103005433042411B1001';
				break;
		}

		that.setData({
			hos, username, hosnum, patname
		});
		let window_h = that.data.window_h;
		this.setData({
			small_subject_h: window_h
		});
		console.log(window_h, that.data.small_subject_h);
		get_list(that);
	},
	set_name(e) {
		let that = this;
		let name = e.detail.value;
		that.setData({
			name
		});
		wx.showLoading({
			title: '加载中...'
		});
		get_list(that);
	},
	get_detail(e) {
		let that = this;
		let deptid = e.currentTarget.dataset.deptid;
		let hos = that.data.hos;
		let patname = that.data.patname;
		wx.navigateTo({
			url: '../subject_info/subject_info?deptid=' + deptid + '&hos=' + hos + '&patname=' + patname
		});
	},
	confirm() {
		let appoint_info_wrap_hidden = true;
		console.log('that', that);
		console.log('global_query', global_query);
		that.setData({
			appoint_info_wrap_hidden
		});


	}
});
function get_list(that) {
	var username = that.data.username;
	var hosnum = that.data.hosnum;
	var regTime = '';
	var regnotype = '1';
	var name = that.data.name;
	var data = {
		hosnum, regTime, regnotype, username, name
	};
	console.log(data, "这里是data")
	data = JSON.stringify(data);
	let url = app.global_data.ajax_url + 'platform/GetDeptInfoByName';
	// let url = app.global_data.ajax_url + 'test/GetDeptInfoByName';
	console.log("开始请求", new Date().getTime())
	var oldtime = new Date().getTime()
	wx.request({
		url,
		method: 'POST',
		data,
		success(res) {
			var nowtime = new Date().getTime()
			console.log('获取到数据的时间' + nowtime - oldtime, res);
			let code = res.data.code;
			if (code == 0) {
				console.log('code', code);
				let list = res.data.data;
				console.log('list', list);
				that.setData({
					list
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
		},
		complete(res) {
			console.log('get_list complete', res);
			wx.hideLoading();
		}
	});
}
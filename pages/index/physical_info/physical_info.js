const app = getApp();
Page({
	data: {
		form: {}
	},
	onLoad(query) {
		let that = this
		// loading
		wx.showToast({
			icon: 'loading',
			duration: 2000
		})
		console.log(query)
		// 请求
		wx.request({
			url: 'https://www.hyxylwsfwzx.com/platform/PhysicalExaminationTwoCancers',
			method: 'POST',
			data: {
				name:query.nameInput,
				tel: query.phoneInput,
				shenfz: query.sfzInput
			},
			success(res) {
				console.log( res.data.data)
				that.setData({
					form: res.data.data[0]
				})
			}
		})
	}
});




const app = getApp();
Page({
	data: {
		form: {}
	},
	onLoad(query) {
		this.setData({
			form: query
		})
	},
	tonav() {
		// 路由跳转
		let queryString = ''
		for (const [key, value] of Object.entries(this.data.form)) {
			queryString += `${key}=${value}&`
		}
		queryString = queryString.slice(0, queryString.length - 1)
		wx.redirectTo({
			url: `../physical_info/physical_info?${queryString}`
		})
	}
});




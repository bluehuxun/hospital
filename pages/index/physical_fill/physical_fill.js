const app = getApp();
Page({
	data: {
		nameInput: '',
		sfzInput: '',
		phoneInput: '',
	},
	onLoad(query) {
	},
	subinfo() {
		let {
			nameInput,
			sfzInput,
			phoneInput,
		} = this.data
		let form = {
			nameInput,
			sfzInput,
			phoneInput,
		}
		// 身份证正则
		let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		// 手机号验证
		let phonereg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
		// 提示
		if (form.nameInput.length == 0) {
			return wx.showToast({
				title: '请填写姓名',
				icon: 'none',
				duration: 2000
			})
		} else if (!idcardReg.test(form.sfzInput)) {
			return wx.showToast({
				title: '身份证格式不对',
				icon: 'none',
				duration: 2000
			})
		} else if (!phonereg.test(form.phoneInput)) {
			return wx.showToast({
				title: '手机号格式不对',
				icon: 'none',
				duration: 2000
			})
		}
		// 路由跳转
		let queryString = ''
		for (const [key, value] of Object.entries(form)) {
			queryString += `${key}=${value}&`
		}
		queryString = queryString.slice(0, queryString.length - 1)
		console.log(queryString)
		wx.redirectTo({
			url: `../physical_list/physical_list?${queryString}`
		})
	}
});




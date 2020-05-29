const app = getApp();
Page({
    data: {
        img_url : app.global_data.img_url,
        account : '',
        pass : ''
    },
    get_account(e){
      var account = e.detail.value;
      this.setData({
          account
      });
    },
    get_pass(e){
        var pass = e.detail.value;
        this.setData({
            pass
        });
    },
    submit(){
        var that = this;
        var account = that.data.account;
        var pass = that.data.pass;
        console.log(account);
        console.log(pass);
        if(!account){
            app.showModal('请输入账号');
            return;
        }
        if(!pass){
            app.showModal('请输入密码');
            return;
        }
    }
});
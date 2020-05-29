Page({
    data: {
        array:['zn','usa','hk'],
        index:0,
        array2 : [
            {
                id : 0,
                name : 'one'
            },
            {
                id : 1,
                name : 'two'
            }
        ],
        index2 : 0,
        array3 : [
            {
                id : 0,
                name : 'one'
            },
            {
                id : 1,
                name : 'two'
            }
        ],
        index3 : 0
    },
    commonSelected: function (e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index: e.detail.value
        });
        console.log(e);
    },
    commonCancel:function(){
        console.log('我取消了！');
    },
    commonSelected2: function (e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index2: e.detail.value
        });
        console.log(e);
    },
    commonCancel2:function(){
        console.log('我取消了！');
    },
    commonSelected3: function (e) {
        //改变index值，通过setData()方法重绘界面
        this.setData({
            index3: e.detail.value
        });
        console.log(e);
    },
    commonCancel3:function(){
        console.log('我取消了！');
    }
});
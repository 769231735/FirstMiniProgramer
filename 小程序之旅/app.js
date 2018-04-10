//app.js
App({
    globalData:{
        // 放置在小程序中使用的全局变量

        // 这个全局变量是解决，跳出来的播放器暂停播放控制图片上的暂停播放
        isPlaying:false,
        // 这个postId是解决从一个播放器播放音乐后，然后返回到其他页面时，其他页面放歌也在放歌的bug
        postId:-1,
        baseUrl:"http://t.yushu.im"
    },

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        
    },
    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {
        
    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {
        
    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {
        
    }
})

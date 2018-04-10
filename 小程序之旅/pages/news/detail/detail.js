// pages/news/detail/detail.js
// 获取全局变量
var app = getApp();
var data = require("../../../data/posts-data.js");
// console.log(data);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news:data.postList[0],
    musicPath: data.postList[0].music.url,
    isPlaying:false,
    postId:0,
    collected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.postId);
    var postId = options.postId; 
    this.setData({
        news:data.postList[postId],
        postId:postId
    })
    // 页面加载时绑定音乐播放处理函数和音乐暂停处理函数（这里的两个函数的作用是我们通过控制跳出系统的音乐播放器的开始和暂停，来控制和音乐图片暂停和播放的一致性）
    var _this = this;
    wx.onBackgroundAudioPlay(function () {
        console.log("开始播放了");
        _this.setData({
            isPlaying: true
        })
        // 全局变量的设置直接赋值运算符（=）赋值，播放的时候告诉全局的app.js里的globalData的isPlaying属性设置为true
        app.globalData.isPlaying = true;
    })
    wx.onBackgroundAudioPause(function () {
        console.log("音乐暂停了");
        _this.setData({
            isPlaying: false
        })
    })
    // 音乐停止时的回调函数
    wx.onBackgroundAudioStop(function(){
        console.log("音乐停止了");
        _this.setData({
            isPlaying:false
        })
    })
    // console.log(this.data.news);
    // 获取全局的存储的正在播放音乐所在页面的postId并与当前页面的postId比较，如果相同，就使用globalDataIsPlaying改变本页面的isPlaying，反之，还是默认false
    var globalPostId = app.globalData.postId;
    // 获取音乐的全局播放状态
    var globalIsPlaying = app.globalData.isPlaying;
    if(globalIsPlaying && globalPostId == postId){
        this.setData({
            isPlaying:true
        })
    }else{
        this.setData({
            isPlaying:false
        })
    }
    // 这个顺序要这样写，下次进入其他详情页
    app.globalData.postId = postId;


    // 异步设置缓存
    // wx.setStorage({
    //     key: 'user',//storage里的键
    //     data: '某某某',//storage的值
    //     success: function (res) { 
    //         console.log(res);
    //     },
    //     fail: function (res) { },
    //     complete: function (res) { },
    // })
    // wx.setStorage({
    //     key: '李四',
    //     data: '18',
    // })
    // wx.getStorage({
    //     key: 'user',
    //     success: function(res) {
    //         console.log(res);
    //     },
    // })


    // 同步以返回值的形式传出来我们想要的信息
    // var user = wx.getStorageSync("user");
    // console.log(user);
    /////////
    
    // 先获取收藏列表，（collectList）
    // 判断收藏列表collectList中有没有值
    // 如果没有值，就先设置当前页面的初始值（）
    // 如果有值就将获取到的本页面的收藏状态值赋值给data中
    var postId = this.data.postId;
    var sCollectList = wx.getStorageSync("collectList");
    var sCollected = sCollectList[postId];
    console.log(sCollectList);
    if (sCollectList){
        // 已存过
        // 没有进入的其他详情页就是还未定义，会引起报错
        if (typeof sCollected == "undefined") {
            // 之前未进入本页，则sCollected没有存储，则需要给该页也进行初始化,
            sCollectList[postId] = false;
        }else {
            this.setData({
                collected: sCollected
            })
        }
    }else{
        // 未存过
        var tempList = {};
        tempList[postId] = false;
        wx.setStorageSync("collectList", tempList);
    }  

  },
//   点击音乐图片
    changeMusic:function(){
        // 设置数据状态 
        var isPlaying = this.data.isPlaying;
        this.setData({
            isPlaying:!isPlaying
        })
        // isPlaying:为true时候，音乐处于播放状态，
        // 为false时，音乐正处于暂停状态
        // isPlaying为true时候，需要暂停音乐，
        // isPlaying为false时候，需要开启音乐
        if(isPlaying){
            // 正在播放中，需要暂停音乐
            wx.pauseBackgroundAudio()
        }else{
            // 音乐暂停中，需播放音乐
            console.log(this.data.news.music.url);
            wx.playBackgroundAudio({
                dataUrl: this.data.news.music.url,
                title: this.data.news.music.title,
                coverImgUrl: this.data.news.music.coverImg
            }) 
        }
    },
    // 改变收藏状态
     changeCollection:function(){
        // 老师的改变收藏缓存
        var _this = this;
        var collected = this.data.collected;
        var postId = this.data.postId;
        // ---------------对勾成功收藏-------------------------------------
        if(collected){
            wx.showModal({
                title: '提示',
                content: '取消收藏此文章？',
                success: function (res) {
                    // res里有res.comfirm和res.cancel,
                    // 也就是对应的点击确认和取消时做的事情，返回true或者false
                    if (res.confirm) {
                        wx.showToast({
                            title: '取消收藏成功',
                            icon: "success",
                            duration: 1000
                        })
                        // 缓存收藏
                        _this.setData({
                            collected: false
                        })
                        // 返回的是我们定义的对象
                        var sCollectList = wx.getStorageSync("collectList");
                        sCollectList[postId] = false;
                        // 然后进行对象覆盖
                        wx.setStorageSync("collectList", sCollectList);
                    } 
                }
            })
        }else{
            wx.showModal({
                title: '提示',
                content: '确认收藏此文章？',
                success: function (res) {
                    if (res.confirm) {
                        wx.showToast({
                            title: '确认收藏成功',
                            icon: "success",
                            duration: 1000
                        })
                        // 缓存收藏
                        _this.setData({
                            collected: true
                        })
                        // 返回的是我们定义的对象
                        var sCollectList = wx.getStorageSync("collectList");
                        // console.log(sCollectList);
                        sCollectList[postId] = true;
                        // 然后进行对象覆盖
                        wx.setStorageSync("collectList", sCollectList);
                    }
                }
            })
        }
        // 结尾标签
        
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
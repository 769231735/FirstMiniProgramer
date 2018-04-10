// pages/news/news.js
// 导入新闻数据，（data中post-data.js中的数据）只能用相对路径
var data = require("../../data/posts-data.js");
console.log(data);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/iqiyi.png',
      '/images/vr.png',
      '/images/wx.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    newsList:data.postList
  },
  viewDetail:function(e){
    var postId = e.currentTarget.dataset.postId;
    wx.navigateTo({
        // 通过url进行传参，然后在跳转页面的 onload生命周期函数的里的options参数中拿到
        url: '/pages/news/detail/detail?postId='+postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
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
//   

  
})
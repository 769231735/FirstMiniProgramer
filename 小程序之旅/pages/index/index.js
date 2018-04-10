Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'/images/avatar/1.png',
    nickName:'hello,七月'
    
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面正在加载，图片和其他资源可能并未加载完成
   */
  onLoad: function (options) {
    // 页面加载时获取用户信息
   
    var _this = this;
    wx.getUserInfo({
      success:function(res){
        console.log(res);
        _this.setData({
          avatarUrl:res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   * onload加载完成后，就出发onshow这个生命周期
   * 
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
    
  },
  //跳转到含有tabBar的页面必须用wx.switchTab()
  comeIn:function(){
    console.log("页面跳转了");
   wx.switchTab({
     url: '/pages/news/news',
   })
  }
})
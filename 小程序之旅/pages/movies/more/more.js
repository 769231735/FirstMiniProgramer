// pages/movies/more/more.js
var http = require("../../../utils/http.js");//封装的网络请求在utils文件夹里
var http = http.http;
var app = getApp();
// console.log(http);
Page({
  /**
   * 页面的初始数据
   */
    data: {
        more:[],//得到的more中的数据,数组
        count:1,
        length:"",
        start:0,
        perLength:null,
        titleText:null //导航栏标题 
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 热映数据
      
      var baseUrl = app.globalData.baseUrl;
      var in_theaters_url = baseUrl + "/v2/movie/in_theaters?start=0&count=9";
      var comming_soon_url = baseUrl + "/v2/movie/coming_soon?start=0&count=9";
      var top250_url = baseUrl + "/v2/movie/top250?start=0&count=9";
      //获取热映数据
    //   var _this = this;
      console.log(options.id)
    var id = parseInt(options.id);
    this.setData({
        id: id

    });
    switch (id) {
        case 0:
            this.getMoreData(in_theaters_url);
            wx.setNavigationBarTitle({
                title: '正在热映'
            })

            break;
        case 1:
            this.getMoreData(comming_soon_url);
            wx.setNavigationBarTitle({
                title: '即将热映'
            })
            break;
        case 2:
            this.getMoreData(top250_url);
            wx.setNavigationBarTitle({
                title: 'top250'
            })
            break;
        default:
            break;
    }
      
  },
// 封装函数获得更多数据
  getMoreData:function(url){
      var _this = this;
      wx.request({
          url: url,
          success: function (res) {
             var more = res.data.subjects;
              _this.setData({
                  more: more
              })
          }
      });
  },
  // 获得电影的详细信息
  moreInfo: function (e) {
      console.log(e);
      
      var gridId = e.currentTarget.dataset.gridId;

      wx.navigateTo({
          url: '/pages/movies/moreInfo/moreInfo?gridId=' + gridId,
      })
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
    //   
  
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
//    * 页面上拉触底事件的处理函数上拉加载
   */
  onReachBottom: function () {
    var id = this.data.id;
    var start = this.data.start+9;
    var baseUrl = app.globalData.baseUrl;
    var _this = this;
    // console.log(res.data.subjects.length);
    switch (id) {
        case 0:
            var url = baseUrl + "/v2/movie/in_theaters?start=" + start + "&count=9";
            break;
        case 1:
            var url = baseUrl + "/v2/movie/coming_soon?start=" + start + "&count=9";
            break;
        case 2:
            var url = baseUrl + "/v2/movie/top250?start=" + start + "&count=9";
            break;
        default:
            break;
    }
    console.log(this.data.perLength);
    //如果总的请求的数据的模15不为0，那么请求的是不足15条数据，或者 最后一次获得的数据（数组的长度）为0的时候就停止函数往下执行
    if (this.data.more.length % 9 != 0 || this.data.perLength==0) {
        return;
    }
    http(url, function (res) {
        console.log(res);
        var more = _this.data.more;
        var perLength =  res.data.subjects.length;
        for (var i = 0; i < perLength;i++){
            more.push(res.data.subjects[i]);
        }
        // _this.data.loadMore.push(loadMore);
        wx.showLoading({
            title: '加载中',

        })
        _this.setData({
            more:more,
            start:start,
            perLength: perLength
        })
        wx.hideLoading()    
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
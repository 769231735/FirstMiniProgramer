// pages/movies/movies.js
// 只能用相对路径
var app = getApp();
var format = require("../../utils/utils.js");
var formatStars = format.formatStars;
var app = getApp("../../app.js");
var http = require("../../utils/http.js");//封装的网络请求在utils文件夹里
var http = http.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      in_theaters:{
            titleText:"正在热映",
            list:{}    
      },
      comming_soon:{
            titleText:"即将上映",
            list:{}
      },
      top250:{
            titleText:"top250",
            list:{}

      },
      searchList:{
      },
      isSearched: false,
      searchValue:"",
      stars_arr:[],
      close:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(formatStars);
    // 热映数据
    var baseUrl = app.globalData.baseUrl;
    var in_theaters_url = baseUrl + "/v2/movie/in_theaters?start=0&count=3";
    var comming_soon_url = baseUrl + "/v2/movie/coming_soon?start=0&count=3";
    var top250_url = baseUrl + "/v2/movie/top250?start=0&count=3";
    var search_url = baseUrl +"/v2/movie/search?q=";
    //获取热映数据
    var _this = this;
    wx.request({
        url: in_theaters_url,
        success: function (res) {
            // console.log(res.data.subjects);
            _this.data.in_theaters.list = res.data.subjects;
            _this.data.in_theaters.titleText = "正在热映";
            var in_theaters = _this.data.in_theaters;
            _this.setData({
                in_theaters: in_theaters
            })
           
        }
    });
    // console.log(this.data.in_theaters);
    // 获取即将上映数据
    wx.request({
        url: comming_soon_url,
        success: function (res) {
            // console.log(res.data.subjects);
            _this.data.comming_soon.list = res.data.subjects;
            _this.data.comming_soon.titleText = "即将上映";
            var comming_soon = _this.data.comming_soon;
            _this.setData({
                comming_soon: comming_soon
            })
        }


    });
    // 获取top250
    wx.request({
        url: top250_url,
        success: function (res) {
            _this.data.top250.list = res.data.subjects;
            _this.data.top250.titleText = "top250";
            var top250 = _this.data.top250;
            _this.setData({
                top250: top250
            })
        }
    });
    console.log(this.data.in_theaters);

  },
// 输入查询数据
  inputData:function(){
    var isSearched = this.data.isSearched;
    this.setData({
        isSearched:true,
        close:false
    });
    console.log(112,this.data.close);
  },
//  点击X执行的函数 
backMoviesIndex:function(){
    // 重新进入搜索页面上次搜索的东西设为空
    var searchList = {};
    var isSearched = this.data.isSearched;
    this.setData({
        isSearched:false,
        searchValue:"",
        searchList:searchList,
        close:true
    });
    
    console.log("我是点X焦点的close", this.data.close);

},
// 失去焦点查询数据
searchList:function(e){
    //返回主页时候，也是失去焦点，因此也会请求数据，因此这个判断语句就是让从
    // 搜索页面跳到主页的时候不请求数据
    var close = this.data.close;
    console.log( "我是失去焦点的close",close);
    if(close){
        return;
    }
    // console.log(e);
    var value = e.detail.value;
    var baseUrl = app.globalData.baseUrl;
    var search_url = baseUrl + "/v2/movie/search?q="+value;
    var _this = this;
    // 获取搜索内容
    // wx.request({
    //     url: search_url,
    //     success: function (res) {
    //         // console.log("失去焦点获取内容", res.data.subjects);
    //         var searchList = res.data.subjects;
            
    //         _this.setData({
    //             searchList: searchList
    //         })
    //     }
    // })
    // 使用封装的函数来处理ajax请求的网络数据
    http(search_url,function(res){
        console.log(res);
        var searchList = res.data.subjects;
        _this.setData({
            searchList: searchList
        })
    })
},
    //more 正在热映，和即将热映和top250 获取更多信息：
    more:function(e){
        // console.log(e.currentTarget.dataset.id);
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/movies/more/more?id='+id,
        })
    },
    // 获得电影的详细信息
    moreInfo:function(e){
        // console.log(e);
        var gridId = e.currentTarget.dataset.gridId;

        wx.navigateTo({
            url: '/pages/movies/moreInfo/moreInfo?gridId='+gridId,
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
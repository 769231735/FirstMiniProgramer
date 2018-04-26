# shine and shadow
## 光&影          微信小程序移动端         

# 项目描述：
该小程序能够进行新闻的阅读（附有歌曲欣赏）和电影评分的搜寻。方便用户随时掌握当下热播的电影以及社会的动态，了解时下的信息。

# 项目职责：
1.完成news页面的轮播图以及文章列表的渲染
	2.实现详情页的收藏功能，以及播放音乐功能
	3.搭建电影首页的搜索功能，分类功能，电影详情页
技术要点：
1.	根据微信开发文档完成页面的布局与搭建
2.	使用微信小程序自身的组件和api接口完成导航功能，页面跳转功能，弹框等
3.	使用模板化编程提高代码的复用性，便于维护
4.	使用wx.request来进行ajax请求获得数据，并且使用mustache语法将数据实时渲染到wxml页面上。
5.	使用wx.setStorage与wx.getStorage实现文章的收藏与否
6.	使用wx.playVoice等接口实现音频播放与暂停功能



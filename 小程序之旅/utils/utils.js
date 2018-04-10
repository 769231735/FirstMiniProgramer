// 对小程序的通用操作，可以封装为一个工具函数，放在utils文件夹中使用

// 本文件用于各种格式化数据

function formatStars(score){
    // 用于格式化星星组件的数据，传入score，返回一个长度为5，每一项或为true，或者为false的数组
    var arr  = [];
    var first = score.substr(0,1);

    for(var i = 0;i<5;i++){ 
        if(i<first){
            arr.push(true);
        }else{
            arr.push(false);
        }
    }
    return arr;
}
function formatMovies(movies){

    return temList;
}
// 导出模块
module.exports = {
  formatStars:formatStars,
  formatMovies:formatMovies
}

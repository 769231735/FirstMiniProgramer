// 用于数据请求
function http(url,succFn){
    wx.request({
        url: url,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
            succFn(res);
        },
        fail: function(res) {
            console.error(res);
        },
        complete: function(res) {},
    })
}
module.exports = {
    http:http
}
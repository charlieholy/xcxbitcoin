Page({
  data: {
    array: []
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'http://localhost:12306/v1/order/orders/place' ,   
      data: {"aa":"bb"},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      // header: {}, // 设置请求的 header  
      success: function (res) {
        console.log(res.data.result)
        that.setData({
          Industry: res.data.result
        })
      },
      fail: function () {
        // fail  
        console.log("fail")
      },
      complete: function () {
        // complete  
        console.log("complete")
      }
    }) 

  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

  onPullDownRefresh: function () {
    this.getData()
  },

  onShareAppMessage: function () {
    return {
      title: '好股',
      desc: `${getApp().globalData.shareDesc}`,
      path: `/pages/haogu/haogu`
    }
  },

})
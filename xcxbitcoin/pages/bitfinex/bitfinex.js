// pages/bitfinex/bitfinex.js

var sub_depth = { "event": "subscribe", "pair": "BTCUSD", "channel": "book", "prec": "P1", "freq": "F0" }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    g_p:{}
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

    console.log("============== onshow")
    var that = this;
    //建立连接
    wx.connectSocket({
      url: "wss://api.bitfinex.com/ws/",
    })

    //连接成功
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: JSON.stringify(sub_depth)
      })
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      var raw_data = data
      var jsondata = JSON.parse(raw_data)
      console.log("data: " + jsondata)
      if (pdata instanceof Array) {
        //console.log("arr: " + subdata)
        var p1 = pdata[1]
        if (p1 && p1 instanceof Array) {
          console.log("depth: " + p1)
          that.setData({
            g_p: p1
          });
        }
      }
    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');

    })
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
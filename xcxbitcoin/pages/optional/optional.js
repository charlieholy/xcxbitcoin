


var intervalId = 0;

var isLongTaping = false;

var sub_depth = { 'event': 'addChannel', 'channel': 'ok_sub_spot_btc_usdt_depth_5', "parameters": {} }

var intervalId = 0;

var isLongTaping = false;

Page({

  data: {
    aryIndexs: [],
    sortType: 1,
    aryGoods: [],
    displayDelIndex: -1,
    array:{
      asks: [['1111', '12312'], ['2222', '12312']],
      bids: [['1111', '12312'], ['333', '12312']]
    }
  },

  

  onLoad: function (options) {
    var that = this;
    //建立连接
    wx.connectSocket({
      url: "wss://real.okex.com:10441/websocket",
    })

    //连接成功
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data:JSON.stringify(sub_depth)
      })
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      var raw_data = data.data
      var subdata = raw_data.substr(1, raw_data.length - 2)
      var jsondata = JSON.parse(subdata)
      console.log("data: " + jsondata.channel)
      that.setData({
        array: jsondata.data
      });
    })

     //连接失败
    wx.onSocketError(function () {
        console.log('websocket连接失败！');
    
    })
    

  }

})






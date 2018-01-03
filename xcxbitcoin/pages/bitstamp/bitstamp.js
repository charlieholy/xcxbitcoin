


var intervalId = 0;

var isLongTaping = false;

var sub_depth = { "cmd": "depth", "data": { "subsribeTick": true } }

var intervalId = 0;

var isLongTaping = false;

Page({

  data: {
    aryIndexs: [],
    sortType: 1,
    aryGoods: [],
    displayDelIndex: -1,
    array: {
      asks: [['1111', '12312'], ['2222', '12312']],
      bids: [['1111', '12312'], ['333', '12312']]
    }
  },



  onLoad: function (options) {
    var that = this;
    //建立连接
    wx.connectSocket({
      url: "ws://106.15.226.6:12345",
    })

    //连接成功
    wx.onSocketOpen(function () {
      wx.sendSocketMessage({
        data: '01234567890123456789012345678912' + JSON.stringify(sub_depth)
      })
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      var raw_data = data.data
      var subdata = raw_data.substr(32, raw_data.lenth);
      //console.log(":2 " + subdata) 
      var par_json = JSON.parse(subdata);
      var jdata = par_json.data;
      var lp = jdata.lp;
      if (lp == 'huopro') {
        var tasks = [];
        tasks[0] = jdata.depth.ask5;
        tasks[1] = jdata.depth.ask4;
        tasks[2] = jdata.depth.ask3;
        tasks[3] = jdata.depth.ask2;
        tasks[4] = jdata.depth.ask1;
        tasks.forEach(function (i) {
          i[0] = i[0].toFixed(4);
          i[1] = i[1].toFixed(3);
        })
        var tbids = [];
        tbids[0] = jdata.depth.bid1;
        tbids[1] = jdata.depth.bid2;
        tbids[2] = jdata.depth.bid3;
        tbids[3] = jdata.depth.bid4;
        tbids[4] = jdata.depth.bid5;
        tbids.forEach(function (i) {
          i[0] = i[0].toFixed(4);
          i[1] = i[1].toFixed(3);
        })
        var tarr = {};
        tarr['asks'] = tasks;
        tarr['bids'] = tbids;
        console.log("tarr: " + tarr)

        that.setData({
          array: tarr
        });
      }

    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');

    })


  }

})






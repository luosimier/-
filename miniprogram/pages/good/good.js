// miniprogram/pages/good/good.js
Page({

onLoad:function(options){
console.log(options.query)
  console.log(options.sfen)
  this.setData({
    fen: options.sfen,
  })
},
    data: {
      message: '心理咨询师',
    id:0,
      fen:0 ,
   banner: ['/images/xin.png', '/images/xin1.png', '/images/xin2.png']
    },
   lastq2: function (e) {
    console.log(this.data.fen)
     wx.navigateTo({
      url: '/pages/im/im',
   })
   },
  

 lastq1: function (e) {
  
    wx.navigateTo({
      url: '/pages/day/day',
    })
  }

})
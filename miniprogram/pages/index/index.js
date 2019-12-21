//index.js
const db = wx.cloud.database()
const qnaire = require("./sas.js")  //导入题库
var ans = new Array(13)  //答案数组初始化，会在onload函数中赋初值""

Page({
data: {
  qnaire: qnaire.qnaire,
    answer: ans,
    fen :0,
    dan:0,
 
    id: 0
  },

  radioChange: function (e) {
    
    console.log(e.detail.value)
  },
  nextq: function () {
    if (this.data.id < 11) {
      this.setData({
        id: this.data.id + 1,
      })
    }
  },

  lastq: function (e) {
    if (this.data.id != 0) {
      this.setData({
        id: this.data.id - 1,
        
      })
      console.log(this.data.id);
    }
  },
submit: function (e) {

  var a = e.detail.value.answer;
  var id = this.data.id;
  var dan = parseInt(e.detail.value.answer)
  ans[id] = a;
  this.setData({
    answer: ans,
    fen:dan+this.data.fen,
  })

  console.log(this.data.fen);

},
 
//判断答题完成情况
formSubmit: function() {
  const that = this;
  var finish;
  var i = 0;
  var _this = this;
 
  while (i < 12) {
    if (ans[i] == NaN) {
      finish = 'false';
      break;
    } else {
      finish = 'true';
    }
    i++;
  }
  if (finish == 'false') {
    wx.showModal({
      title: '无法提交',
      content: '您还有部分题目未完成，请检查后重新提交',
      showCancel: false,
      confirmColor: '#fcbe39',
      confirmText: "好的",
      success(res) {
        _this.setData({
          id: i,
        })
      }
    })
  } else {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      
      wx.hideLoading({
        
        success(res) {
          _this.answer2db();
          let fen = encodeURIComponent(fen);
          wx.navigateTo({
            url: '/pages/good/good?sfen=' +that.data.fen,
          })
         
          console.log(that.data.fen)
        }
      })
    }, 2000)
  }
},

//将用户完成的答案数组上传至云数据库
answer2db: function() {
  db.collection('qqq').add({
    data: {
      answer: this.data.answer
    },
    success(res) {
      console.log(res._id);
    },
    fail(res) {
      wx.showToast({
        icon: 'none',
        title: '新增记录失败'
      })
      console.error('[数据库] [新增记录] 失败：', err)
    }
  })
}

})
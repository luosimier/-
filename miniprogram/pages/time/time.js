const db = wx.cloud.database()
Page({

 
  data: {
       id:0,
  },

  comfirm: function () {
    db.collection('qqq').add({
      data: {
        answer: this.data.id
      },
      success(res) {
        console.log(res._id);
        wx.showToast({
          icon: 'none',
          title: '预约成功'
        })
      },
      fail(res) {
        wx.showToast({
          icon: 'none',
          title: '预约失败'
        })
        console.error('[数据库] [ 预约] 失败：', err)
      }
    })
  }
})
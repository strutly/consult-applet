// pages/demo/login.js
Page({


  data: {

  },

  onLoad(options) {

  },

  toUrl(e){
    wx.navigateTo({
      url: e.target.dataset.url,
    })
  }
})
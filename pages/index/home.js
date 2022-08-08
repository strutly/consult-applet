var that;
Page({
  data: {
    login:false
  },
  onLoad(options) {
    that = this;
  },
  onShow(){
    wx.showLoading({
      title: '登录中~',
    })
    getApp().watch(function (value) {
      wx.hideLoading();
      if(value==1){
        wx.reLaunch({
          url: '/pages/index/my'            
        })
      }else if(value==2){
        wx.reLaunch({
          url: '/pages/expert/index',
        })
      }else{
        that.setData({
          login:true
        })
      }
    });       
  }, 
  loginModal(){
    that.setData({
      loginModal:true
    })
  }
})
var that;
Page({
  data: {

  },
  onLoad(options) {
    that = this;
  },
  onShow(){
    getApp().watch(function (value) {
      console.log(value)
      if(value==1){
        wx.reLaunch({
          url: '/pages/index/my'            
        })
      }else if(value==2){
        wx.reLaunch({
          url: '/pages/expert/index',
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
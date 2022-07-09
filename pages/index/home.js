var that;
const app = getApp();
import Api from '../../config/api';
Page({
  data: {

  },
  onLoad(options) {
    that = this;
  },
  onReady(){
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
})
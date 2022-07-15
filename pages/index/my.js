var that;
import Api from "../../config/api";
Page({
  data: {
    userInfo:wx.getStorageSync('userInfo')
  },
  onLoad(options) {
    that = this;    
  },
  onShow(){
    getApp().watch(function (value) {
      console.log(value)      
      that.setData({
        mold:value
      })
    });       
  }, 
  showTips(msg,type="error"){
    that.setData({
      show:true,
      msg:msg,
      type:type
    })
  },
  async getUserProfile(e) {
    console.log(e);
    let userInfo = await wx.getUserProfile({ desc: '用于完善会员资料' });
    if (userInfo.errMsg !== 'getUserProfile:ok') {
      that.showTips("您已经拒绝获取用户信息~", "error");
      return;
    }
    wx.setStorageSync('userInfo', userInfo.userInfo);
    let code = await Api.getCode();
    let res = await Api.auth({
      code: code,
      encryptedData: userInfo.encryptedData,
      iv: userInfo.iv,
      signature: userInfo.signature,
      rawData: userInfo.rawData
    });
    console.log(res);
    wx.removeStorageSync('code');
    if (res.code == 0) {
      that.showTips("授权成功", "success");
      that.setData({
        auth: true,
        userInfo:userInfo.userInfo
      });
      wx.setStorageSync('auth', true);
    } else {      
      that.showTips(res.msg, "error");
    }
  },
  loginModal(){
    that.setData({
      loginModal:true
    })
  }
})
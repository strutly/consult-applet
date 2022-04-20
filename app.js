import Api from "./config/api";
import {Event} from './utils/event';
App({
  onLaunch() {
    let that = this;

    setTimeout(function(){
      console.log(123)
      that.globalData.auth = true;
      

      //发射事件给消息页面监听
      wx.event.emit('change', {auth:true})

    },5000)

    // Api.login().then(res=>{
    //   console.log(res);
    //   that.globalData.login = true;
    //   if(res.code==0){
    //     setTimeout(function(){
    //       that.globalData.auth = true;            
    //     },5000);
    //   }      
    // });
  },
  onShow: function() {
    //实例化
    wx.event = new Event()

    //发射事件给消息页面监听
    
  },


  globalData: {
    auth: false,
    login: false
  },
  watch(method) {
    var obj = this.globalData;
    Object.defineProperty(obj, 'auth', {
      configurable: true,
      enumerable: true,
      set:function(value) {
        this._name = value;        
        method(value);
      },
      get: function () {
        return this._name;
      }
    })
    if(obj.login){
      method(obj.auth);
    }
  }
})

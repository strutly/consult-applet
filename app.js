import Api from "./config/api";
App({
  onLaunch() {
    let that = this;
    Api.login().then(res=>{
      console.log(res);
      if(res.code==0){
        setTimeout(function(){
          that.globalData.auth = true;  
        },500);
      }      
    });
  },
  globalData: {
    auth: false,
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
  }
})

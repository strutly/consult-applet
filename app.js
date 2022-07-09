import Api from "./config/api";
App({
  onLaunch() {
    let that = this;
    Api.login().then(res => {
      console.log(res);
      setTimeout(function () {
        that.globalData.login = true;
        if (res.code == 0) {
          that.globalData.mold = res.data.mold;
        }
      }, 1000);
    });
  },
  globalData: {
    mold: 0,
    login: false
  },
  watch(method) {
    var obj = this.globalData;
    console.log(obj)    
    if (obj.login) {
      console.log(obj)
      method(obj.mold);
    }else{
      Object.defineProperty(obj, 'mold', {
        configurable: true,
        enumerable: true,
        set: function (value) {
          this._mold = value;
          method(value);
        },
        get: function () {
          return this._mold;
        }
      })
    }
  }
})

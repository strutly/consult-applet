import Api from "./config/api";
App({
  onLaunch() {
    let that = this;
    Api.login().then(res => {
      setTimeout(function () {
        that.globalData.login = true;
        if (res.code == 0) {
          that.globalData.auth = true;
        }else{
          that.globalData.auth = false;
        }
      }, 1000);
    });
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
      set: function (value) {
        this._name = value;
        method(value);
      },
      get: function () {
        return this._name;
      }
    })
    if (obj.login) {
      method(obj.auth);
    }
  }
})

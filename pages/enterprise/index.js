var that;
import Api from "../../config/api";
Page({
  data: {
    enterprises: [],
    classifyArrr: ["信息技术", "智能制造", "工业互联网", "物联网", "集成电路", "高端装备", "节能环保", "新材料", "新能源", "电子元器件", "汽车及零部件", "云计算和大数据", "生物医药", "5G产业", "人工智能", "石墨烯", "两机产业", "其他"]
  },
  onLoad(options) {
    that = this;
  },
  onReady() {
    let tabBar = this.selectComponent('#tabBar');    
    getApp().watch(function (value) {
      tabBar.setData({
        first: false,
        auth: value,
        currentTab: "/pages/enterprise/index"
      })
      that.setData({
        authModal:!value
      })
      if (value) {
        that.getList("", 1);
      }
    });
  },
  async getList(name, pageNum) {
    let res = await Api.enterprisePage({ title: name, pageNum: pageNum });
    console.log(res);
    if (res.code != 0) {
      return that.authModal();
    }
    let enterprises = that.data.enterprises || [];
    enterprises = enterprises.concat(res.data.content);
    that.setData({
      pageNum: pageNum,
      name: name,
      endline: res.data.last,
      enterprises: enterprises
    });
  },
  search(e) {
    console.log(e);
    let value = e.detail.value;
    that.setData({
      enterprises: [],
      name: value.title
    });
    that.getList(value.title, 1)
  },
  onReachBottom() {
    let endline = that.data.endline;
    if (!endline) {
      let pageNum = that.data.pageNum + 1;
      let name = that.data.name;
      that.getList(name, pageNum);
    }
  },
  authModal() {
    that.setData({
      authModal: !that.data.authModal,
    })
  },
  async getPhoneNumber(e) {
    console.log(e);
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      let code = await Api.getCode();
      let res = await Api.phone({
        encryptedData: e.detail.encryptedData,
        code: code,
        iv: e.detail.iv
      })
      console.log(res);
      if (res.code == 0) {
        wx.setStorageSync('token', res.data);
        getApp().globalData.auth = true;
        that.setData({
          auth: true,
          authModal: false
        });
        //that.getList("", 1);
      } else {
        that.setData({
          msg: res.msg,
          show: true,
          type: "error"
        });
      }
    } else {
      that.setData({
        msg: "您已拒绝授权获取手机号~",
        show: true,
        type: "error"
      });

    }
  },
  home() {
    wx.switchTab({
      url: '/pages/expert/index',
    })
  }
})